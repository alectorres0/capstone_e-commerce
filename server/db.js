/*
PURPOSE OF DB: 
TO ADD USERS
TO BE ABLE TO LOGIN WITH USER INFORMATION
RETURN TOKEN
TO BE ABLE TO LOG OUT
TO HOLD CARTS THAT ARE TIED TO USERS
TO BE ABLE TO CLEAR CARTS
TO BE ABLE TO ADD TO CARTS
TO BE ABLE TO SUBTRACT FROM CARTS
TO BE ABLE TO UPDATE ITEMS IN CART
TO BE ABLE CHECK OUT 
*/


const pg = require('pg');
const client = new pg.Client('postgres://localhost/The_Best_Store');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const createTables = async() =>{
const SQL = `
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS users;
CREATE TABLE users(
id UUID PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
firstname VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
city VARCHAR(255) NOT NULL,
street VARCHAR(255) NOT NULL,
zipcode VARCHAR(255) NOT NULL,
phone VARCHAR(255) NOT NULL
);
CREATE TABLE cart(
id UUID PRIMARY KEY,
user_id UUID REFERENCES users(id) NOT NULL,
products JSON 
);
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
return response.rows[0];

}

const authenticate = async({ username})=> {
    const SQL = `
      SELECT id, username FROM users WHERE username=$1;
    `;
    const response = await client.query(SQL, [username]);
    if(!response.rows.length){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    return { token: response.rows[0].id };
  };
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
const addToCart = async({cartid, products}) =>{
  const fetchedProducts = await fetchProducts({cartid: cartid});
  console.log(fetchedProducts);
  if (!fetchedProducts) {
    const SQL = `
    UPDATE cart 
    SET products = $1
    WHERE id = $2
    RETURNING *
    `;
    const response = await client.query(SQL, [JSON.stringify(products),cartid]);
    //console.log("added items to cart: " + JSON.stringify(response.rows[0]))
    return response.rows[0]
  } else {
  fetchedProducts.push(products);
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












module.exports = {
client,
createTables,
createUser,
createCart,
authenticate,
fetchProducts,
addToCart

}