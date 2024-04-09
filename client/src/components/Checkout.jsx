import {clearCart} from "../API"

const Checkout = ({setCartQuantity,totalPrice,setTotalPrice, token, cartId}) =>{

    const handleSubmit=async(e) =>{
        e.preventDefault();
        await clearCart({cartid: cartId, token: token})
        setTotalPrice(0);
        setCartQuantity(0);
    }

    return(
       
<form className = "registerForm" onSubmit = {(e)=>{handleSubmit(e)}} >
        <label>
            Credit Card Number:
            <input name = "creditcardNumber" />
        </label><br></br>
        <label>
           SVC:
            <input name = "svc" />
        </label><br></br>
        <label>
            Expiration Date:
            <input name = "expirationDate" />
        </label><br></br>
        <label>
            Email:
            <input name = "email" />
        </label><br></br>
        <p>Total Price: {totalPrice}</p>
        <button type = "submit" >CheckOut</button>
    </form>
    
   
    )

}





export default Checkout