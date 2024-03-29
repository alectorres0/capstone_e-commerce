import {useNavigate} from "react-router-dom"

const ItemCard = ({item}) =>{
    const navigate = useNavigate();
return(
    <div className = "itemcard" onClick = { () =>{navigate(`/item/${item.title}/${item.id}`)}}>
        <img src = {item.image}></img>
        <p>{item.title}<br></br>${item.price}</p>
    </div>
)
}


export default ItemCard;