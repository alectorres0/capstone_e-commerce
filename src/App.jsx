import { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import Mens from './Components/Mens'
import Womens from './Components/Womens'
import Electronics from './Components/Electronics'
import Jewelery from './Components/Jewelery'
import Navbar from './Components/Navbar'
import {Routes, Route} from "react-router-dom"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path = "*" element = {<Home/>}/>
      <Route path = "/mens" element = {<Mens/>}/>
      <Route path = "/womens" element = {<Womens/>}/>
      <Route path = "/electronics" element = {<Electronics/>}/>
      <Route path = "/jewelery" element = {<Jewelery/>}/>
    </Routes>
    
   </>
  )
}

export default App
