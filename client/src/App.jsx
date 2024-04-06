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
import {Routes, Route} from "react-router-dom"
function App() {
  const [cartId,setCartId] = useState(null);

  return (
    <>
    <Navbar/>
    { cartId && <Cart />}
    <Routes>
      <Route path = "*" element = {<Home/>}/>
      <Route path = "/men's clothing" element = {<Mens/>}/>
      <Route path = "/women's clothing" element = {<Womens/>}/>
      <Route path = "/electronics" element = {<Electronics/>}/>
      <Route path = "/jewelery" element = {<Jewelery/>}/>
      <Route path = "/item/:name/:id" element = {<SingleItem />}/>
      <Route path = "/register" element = {<Register cartId = {cartId} setCartId = {setCartId}/>}/>
      <Route path = "/login" element = {<Login/>}/>
    </Routes>
    
   </>
  )
}

export default App
