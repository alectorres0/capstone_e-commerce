const {client,createTables,createUser,createCart,fetchCart,clearCart,authenticate,fetchProducts, addToCart, removeProduct, updateQuantity} = require('./db');

const express = require('express');
const app = express();
app.use(express.json());



const init = async() =>{
const port = process.env.PORT || 3000;
await client.connect();
console.log('connected to database');

await createTables();
console.log('tables created');

const julie =  await createUser({email: 'julie@email.com', username: 'julie', password:'password', firstname: 'julie', lastname: 'torres', city:'losangeles', street: '4th', zipcode: '675893', phone:'909909909'});
console.log('tables seeded')
console.log("julie password: " + julie.password)

await authenticate({userid: julie.id, username: julie.username, password: "password"})

const cart = await createCart({userid: julie.id});
console.log("cart created");
await addToCart({cartid: cart.id, products:{product_id: 4, quantity:3}})
console.log("first time adding to cart ^")
await addToCart({cartid: cart.id, products:{product_id: 69, quantity:1}})
await addToCart({cartid: cart.id, products:{product_id: 69, quantity:1}})
await fetchCart({cartid: cart.id});
console.log("second time");
await fetchProducts({cartid: cart.id});
console.log("products fetched");

await removeProduct({cartid: cart.id, productid:4})

await updateQuantity({cartid: cart.id,productid: 69, newQuantity: 500})
await clearCart({cartid: cart.id});
app.listen(port, ()=>console.log(`listening on port ${port}`));

}

init();