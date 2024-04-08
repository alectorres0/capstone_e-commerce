import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Mens from './components/Mens'
import Womens from './components/Womens'
import Electronics from './components/Electronics'
import Jewelery from './components/Jewelery'
import Navbar from './components/Navbar'
import SingleItem from './components/SingleItem'
import Register from "./components/Register"
import Login from "./components/Login"
import Cart from "./components/Cart"
import CartItems from './components/CartItems'
import {Routes, Route} from "react-router-dom"
function App() {
  const [cartId,setCartId] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0);


  return (
    <>
    <Navbar/>
    { cartId && <Cart cartQuantity = {cartQuantity} setCartQuantity={setCartQuantity} userId = {userId} token = {token}/>}
    <Routes>
      <Route path = "*" element = {<Home/>}/>
      <Route path = "/men's clothing" element = {<Mens/>}/>
      <Route path = "/women's clothing" element = {<Womens/>}/>
      <Route path = "/electronics" element = {<Electronics/>}/>
      <Route path = "/jewelery" element = {<Jewelery/>}/>
      <Route path = "/item/:name/:id" element = {<SingleItem token = {token} setToken = {setToken} userId = {userId} cartQuantity = {cartQuantity} setCartQuantity = {setCartQuantity}/>}/>
      <Route path = "/register" element = {<Register cartId = {cartId} setCartId = {setCartId} token = {token} setToken = {setToken} userId = {userId} setUserId = {setUserId}/>}/>
      <Route path = "/login" element = {<Login cartId = {cartId} setCartId = {setCartId} token = {token} setToken = {setToken} userId = {userId} setUserId = {setUserId}/>}/>
      <Route path = "/cartitems" element = {<CartItems userId = {userId} token = {token}/>}/>
    </Routes>
    
   </>
  )
}

export default App
