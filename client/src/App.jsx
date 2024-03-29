import { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import Mens from './Components/Mens'
import Womens from './Components/Womens'
import Electronics from './Components/Electronics'
import Jewelery from './Components/Jewelery'
import Navbar from './Components/Navbar'
import SingleItem from './Components/SingleItem'
import Register from "./Components/Register"
import Login from "./Components/Login"
import {Routes, Route} from "react-router-dom"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path = "*" element = {<Home/>}/>
      <Route path = "/men's clothing" element = {<Mens/>}/>
      <Route path = "/women's clothing" element = {<Womens/>}/>
      <Route path = "/electronics" element = {<Electronics/>}/>
      <Route path = "/jewelery" element = {<Jewelery/>}/>
      <Route path = "/item/:name/:id" element = {<SingleItem />}/>
      <Route path = "/register" element = {<Register />}/>
      <Route path = "/login" element = {<Login/>}/>
    </Routes>
    
   </>
  )
}

export default App
