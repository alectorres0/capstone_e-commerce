/*
PURPOSE OF DB: 
TO ADD USERS -
TO BE ABLE TO LOGIN WITH USER INFORMATION
RETURN TOKEN
TO BE ABLE TO LOG OUT
TO HOLD CARTS THAT ARE TIED TO USERS -
TO BE ABLE TO CLEAR CARTS
TO BE ABLE TO ADD TO CARTS - 
TO BE ABLE TO SUBTRACT FROM CARTS -
TO BE ABLE TO UPDATE ITEMS IN CART -
TO BE ABLE CHECK OUT 
*/


const pg = require('pg');
const client = new pg.Client('postgres://localhost/The_Best_Store');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createTables = async() =>{
const SQL = `
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        CREATE TABLE users(
            id UUID PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            street VARCHAR(255) NOT NULL,
            zipcode VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL
        );
    END IF;
END $$;

-- Check if the cart table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cart') THEN
        CREATE TABLE cart(
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id) NOT NULL,
            products JSON 
        );
    END IF;
END $$;
`;
await client.query(SQL);
};

const createUser = async({email, username, password, firstname, lastname, city, street, zipcode, phone}) =>{
const SQL = `
INSERT INTO users(id, email, username, password, firstname, lastname, city, street, zipcode, phone)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING *
`;
const response = await client.query(SQL, [uuid.v4(), email, username, await bcrypt.hash(password,5),firstname,lastname,city,street,zipcode,phone]);
//console.log("user" + JSON.stringify(response.rows[0]));
const token = jwt.sign(response.rows[0].id, secret );
return {user: response.rows[0], token: token}

}
const getUser = async({username}) =>{
  const SQL = `
  SELECT * FROM users WHERE username = $1
  `;
  
  const response = await client.query(SQL, [username]);
  if(!response.rows.length){
    const error = Error("wrong id");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
}
const secret = '1234onetwothreefour567fivesixseven';
const authenticate = async({username, password})=> {
    const user = await getUser({username: username});
    if (!await bcrypt.compare(password, user.password)){
      const error = new Error('Not authorized');
    error.status = 401;
    throw error;
    }

    const SQL = `
      SELECT id, username FROM users WHERE username=$1
    `;
    const response = await client.query(SQL, [username]);
    if(!response.rows.length){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    const userID = response.rows[0].id
   
    const token = jwt.sign(userID, secret );
    console.log("Token: " + token);
    return {user: response.rows[0],token: token};
  };

  const verifyToken = async(token) =>{
    const decodedToken = jwt.verify(token,secret);
    console.log("decoded token: " + decodedToken);
    const SQL = `
    SELECT id FROM users WHERE id = $1
    
    `;
    const response = await client.query(SQL, [decodedToken]);
    if(!response.rows.length){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    return response.rows[0].id;
  }
const createCart = async({userid}) =>{
    const SQL = `
    INSERT INTO cart(id, user_id)
    VALUES($1, $2)
    RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(),userid]);
    //console.log("cart" + JSON.stringify(response.rows[0]));
    return response.rows[0];
}

const fetchCart = async({userid}) =>{
const SQL = `
SELECT id FROM cart WHERE user_id = $1
`;
const response = await client.query(SQL, [userid]);
if (response.rows.length === 0) {
  throw new Error("Cart not found for the user");
}

const realCart = `
SELECT * FROM cart WHERE id = $1
`;
const realCartResponse = await client.query(realCart, [response.rows[0].id]);
console.log("real cart: " + JSON.stringify(realCartResponse.rows[0]));
return realCartResponse.rows[0];
}

const clearCart = async({cartid}) =>{
let fetchedProducts = await fetchProducts({cartid: cartid});
fetchedProducts = null;
const SQL = `
UPDATE cart
SET products = $1
WHERE id = $2
RETURNING*
`
const response = await client.query(SQL,[fetchedProducts, cartid])
//console.log("deleted items from cart: " + JSON.stringify(response.rows[0]));
return response.rows[0];
}
const addToCart = async({cartid, products}) =>{
  let fetchedProducts = await fetchProducts({cartid: cartid});
  if (!fetchedProducts) {
    fetchedProducts = []
  } 
  
    let found = false;
      fetchedProducts.forEach((product)=>{
        if(product.product_id === products.product_id){

          let addedQuantity = parseInt(products.quantity) + parseInt(product.quantity);
          product.quantity = addedQuantity.toString();
          found = true;
        }
      })
  
  if (!found) {
  fetchedProducts.push(products);
  
}
  const SQL = `
  UPDATE cart
  SET products = $1
  WHERE id = $2
   RETURNING *
   `;
  const response = await client.query(SQL,[JSON.stringify(fetchedProducts),cartid]);
  //console.log("added item to cart: " + JSON.stringify(response.rows[0]));
  return response.rows[0];
  
   
}
const fetchProducts = async({cartid}) =>{
const SQL = `
SELECT products FROM cart where id = $1
`;
const response = await client.query(SQL,[cartid]);
const data = response.rows[0];
console.log("Fetched Products: " + JSON.stringify(data.products));
return data.products;
}

const removeProduct = async({cartid, productid}) =>{
const fetchedProducts = await fetchProducts({cartid: cartid});
const filteredProducts = fetchedProducts.filter((product)=>{
return product.product_id != productid;

})

const SQL = `
UPDATE cart
set PRODUCTS = $1
WHERE id = $2
RETURNING *
`;

const response = await client.query(SQL,[JSON.stringify(filteredProducts), cartid]);
//console.log("removed items: " + JSON.stringify(response.rows[0]));
return response.rows[0];
}

const updateQuantity = async({cartid, productid, newQuantity}) =>{
  const fetchedProducts = await fetchProducts({cartid: cartid});
  fetchedProducts.forEach((product)=>{
    if (product.product_id === productid){
      product.quantity = newQuantity;
    }
  })
  const SQL = `
UPDATE cart
set PRODUCTS = $1
WHERE id = $2
RETURNING *
`;

const response = await client.query(SQL,[JSON.stringify(fetchedProducts), cartid]);
//console.log("updated quantity" + JSON.stringify(response.rows[0]));
return response.rows[0];
}










module.exports = {
client,
createTables,
createUser,
getUser,
createCart,
fetchCart,
clearCart,
authenticate,
fetchProducts,
addToCart,
removeProduct,
updateQuantity,
verifyToken

}