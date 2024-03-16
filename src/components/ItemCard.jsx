

const ItemCard = ({item}) =>{
return(
    <div className = "itemcard">
        <img src = {item.image}></img>
        <p>{item.title}</p>
    </div>
)
}


export default ItemCard;