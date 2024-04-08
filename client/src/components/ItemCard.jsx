import {useNavigate} from "react-router-dom"

const ItemCard = ({item}) =>{
    const navigate = useNavigate();
return(
    <div className = "itemcard" onClick = { () =>{navigate(`/item/${item.title}/${item.id}`)}}>
        <img src = {item.image}></img>
        {!(item.quantity) ? (<p>{item.title}<br></br>${item.price}</p>):
        (

            <p>{item.title}<br></br>${item.price}<br></br>Quantity: {item.quantity}</p>
        )
        
        }
        
        
    </div>
)
}


export default ItemCard;