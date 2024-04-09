import {useNavigate} from "react-router-dom"
import { updateQuantity, removeItem } from "../API";
import { useState } from "react";

const ItemCard = ({item, cartId, token, setTotalPrice,setCartQuantity}) =>{
    const navigate = useNavigate();
    const handleDelete = async(e) =>{
        e.preventDefault();
        await removeItem({cartid: cartId, productid: item.id, token: token})
        setTotalPrice("...");
        setCartQuantity("...")
    }
return(
    <div className = "itemcard" >
        <img src = {item.image} onClick = { () =>{navigate(`/item/${item.title}/${item.id}`)}}></img>
        {!(item.quantity) ? (<p>{item.title}<br></br>${item.price}</p>):
        (
            <>
            <p>{item.title}<br></br>${item.price}<br></br>Quantity: 
            <select name = "quantity" id = "quantity" onChange = {(e)=>{updateQuantity({cartid: cartId, productid:item.id, newQuantity:e.target.value, token:token });setTotalPrice("...");setCartQuantity("...")}}>
            <option value = {item.quantity} selected>{item.quantity}</option>
            <option value = "1">1</option>
            <option value = "2">2</option>
            <option value = "3">3</option>
            <option value = "4">4</option>
            <option value = "5">5</option>
            <option value = "6">6</option>
            <option value = "7">7</option>
            <option value = "8">8</option>
            <option value = "9">9</option>
            <option value = "10">10</option>
        </select>
        <button id = "deleteButton" onClick = {(e)=>{handleDelete(e)}}>Delete</button>
        </p>
        
        </>
        )
        
        }
        
        
    </div>
)
}


export default ItemCard;