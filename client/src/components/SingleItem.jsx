import {useParams, Link, useNavigate} from "react-router-dom"
import {getItem, addToCart, fetchCart} from "../API"
import {useState, useEffect} from "react"
const SingleItem = ({token, setToken,userId}) =>{
const {id} = useParams();
const [data, setData] = useState({});
const navigate = useNavigate();
useEffect(()=>{
const getData = async() =>{

const item = await getItem(id);
setData(item);


}
getData();
},[])

const handleCheckOut = async(e) =>{
    e.preventDefault();
    if (!token){
        navigate('/login');
    }
    else{
    const cart = await fetchCart({userid: userId, token: token});
    const quantityElement = document.getElementById('quantity');
    const selectedQuantity = quantityElement.value;
    const product = {product_id: data.id, quantity: selectedQuantity}
    const addedItem = await addToCart({cartid: cart.id, products: product, token:token});
    console.log(addedItem);
    }
}

return(

<div className = "singleItem">
<img src = {data.image}></img>
<div className = "itemDescription">
<h2>{data.title}</h2>
<h3>{`Price: $${data.price} - Category: `}<Link to ={`/${data.category}`}>{data.category}</Link></h3>
<p>{data.description}</p>
<div className = "quantity">
    <p>Quantity:</p>
    <select name = "quantity" id = "quantity">
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
    <button onClick = {(e) => {handleCheckOut(e)}}>checkout</button>
</div>
</div>
</div>


)

}

export default SingleItem