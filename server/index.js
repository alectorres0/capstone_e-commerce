const {client,createTables,createUser,createCart,verifyToken,fetchCart,clearCart,authenticate,fetchProducts, addToCart, removeProduct, updateQuantity} = require('./db');

const express = require('express');

const app = express();
app.use(express.json());
app.use(require('morgan')('dev'));


const authenticateToken = async(req,res,next) =>{
const token = req.headers.authorization;
if (!token) {
    return res.status(401).json({ error: 'Authorization token is required' });
  }
  try {
    const decodedToken = await verifyToken(token);
    req.user = decodedToken;
    console.log("decodedToken from auth:" + decodedToken);
    console.log("req.user" + req.user);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }


}
app.post('/api/register',async(req,res,next)=>{

    try{

        res.send(await createUser({email: req.body.email, username: req.body.username, password:req.body.password, firstname: req.body.firstname, lastname: req.body.lastname, city:req.body.city, street: req.body.street, zipcode: req.body.zipcode, phone:req.body.phone}))
    }

    catch(err){

        next(err)
    }

});

app.post('/api/auth/login', async(req, res, next)=> {
    try {
      res.send(await authenticate({userid: req.body.userid, username: req.body.username, password: req.body.password}));
    }
    catch(ex){
      next(ex);
   }
  });

app.post('/api/cart',authenticateToken, async(req,res,next)=>{     try{
        res.send(await createCart({userid: req.user}))

    }

   catch(err){

        next(err);
    }
 })



const init = async() =>{
const port = process.env.PORT || 3000;
await client.connect();
console.log('connected to database');

await createTables();
console.log('tables created');

const julie =  await createUser({email: 'julie@email.com', username: 'julie', password:'password', firstname: 'julie', lastname: 'torres', city:'losangeles', street: '4th', zipcode: '675893', phone:'909909909'});
console.log('tables seeded')
console.log("julie ID: " + julie.id)

const token = await authenticate({userid: julie.id, username: julie.username, password: "password"})
await verifyToken(token);
const cart = await createCart({userid: julie.id});
//console.log("cart created");
await addToCart({cartid: cart.id, products:{product_id: 4, quantity:3}})
//console.log("first time adding to cart ^")
await addToCart({cartid: cart.id, products:{product_id: 69, quantity:1}})
await addToCart({cartid: cart.id, products:{product_id: 69, quantity:1}})
await fetchCart({cartid: cart.id});
//console.log("second time");
await fetchProducts({cartid: cart.id});
//console.log("products fetched");

await removeProduct({cartid: cart.id, productid:4})

await updateQuantity({cartid: cart.id,productid: 69, newQuantity: 500})
await clearCart({cartid: cart.id});
app.listen(port, ()=>console.log(`listening on port ${port}`));

}

init();