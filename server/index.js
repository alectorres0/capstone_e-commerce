const {client,createTables,createUser,createCart,authenticate,fetchProducts, addToCart} = require('./db');

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
console.log("julie ID: " + julie.id)


const cart = await createCart({userid: julie.id});
console.log("cart created");
await addToCart({cartid: cart.id, products:[{product_id: 4, quantity:3},{product_id:3, quantity:2}]})
console.log("first time adding to cart ^")
await addToCart({cartid: cart.id, products:{product_id: 69, quantity:1}})
console.log("second time");
await fetchProducts({cartid: cart.id});
console.log("products fetched");
app.listen(port, ()=>console.log(`listening on port ${port}`));

}

init();