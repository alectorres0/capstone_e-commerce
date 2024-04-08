import { fetchCart } from "../API"
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"

const Cart = ({cartQuantity, setCartQuantity, userId, token}) =>{
    const navigate = useNavigate();
    const getCartQuantity = async() =>{
        const cart = await fetchCart({userid:userId, token:token})
        if(cart.products){
        let totalQuantity = 0;
        cart.products.forEach((item)=>{
            totalQuantity += parseInt(item.quantity);
        })
        setCartQuantity(totalQuantity);
    }
    }
    
        getCartQuantity();
    

    

    return(
        <div className = "cart" onClick = {() =>{navigate("/cartitems")}}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
            </svg>
            <span id = "cartQuantity">{cartQuantity}</span>

        </div>

    )

}



export default Cart