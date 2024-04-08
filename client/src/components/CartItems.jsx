import { fetchCart, getItem } from "../API";
import {useState, useEfffect, useEffect} from "react"
import ItemCard from "./ItemCard";

//get cart
//loop throught cart products and grab id and quantity
//get item info with product_id
//create itemCard with item info and quantity and total price 
const CartItems =({userId, token, cartId})=>{
const [cartItems, setCartItems] = useState([]);
const [totalPrice, setTotalPrice] = useState(0);
useEffect(()=>{
    const setList = async()=>{
    const cart = await fetchCart({userid: userId, token: token})
    const items = []
    let calculatedPrice = 0;
    for (const item of cart.products){
        const result = await getItem(item.product_id);
        result.quantity = item.quantity;
        result.totalItemPrice = result.price * result.quantity
        calculatedPrice += (result.price * result.quantity);
        items.push(result);
    }
    setCartItems(items);
    setTotalPrice(Number(calculatedPrice.toFixed(2)));
    }

    setList();
    
    
},[totalPrice])
console.log(cartItems);
return(
    <div>
    {cartItems.map((item)=>{
        return (<ItemCard key = {item.id} item = {item} cartId = {cartId} token = {token} setTotalPrice = {setTotalPrice}/>)

    })}
    <h2>Total Price: ${totalPrice}</h2>
    </div>
    
)
}



export default CartItems;