

const ItemCard = ({item}) =>{
return(
    <div className = "itemcard">
        <img src = {item.image}></img>
        <p>{item.title}<br></br>${item.price}</p>
    </div>
)
}


export default ItemCard;