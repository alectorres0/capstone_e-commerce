import {useParams, Link} from "react-router-dom"
import {getItem} from "../API"
import {useState, useEffect} from "react"
const SingleItem = () =>{
const {id} = useParams();
const [data, setData] = useState({});

useEffect(()=>{
const getData = async() =>{

const item = await getItem(id);
setData(item);


}
getData();
},[])

return(

<div className = "singleItem">
<img src = {data.image}></img>
<div className = "itemDescription">
<h2>{data.title}</h2>
<h3>{`Price: $${data.price} - Category: `}<Link to ={`/${data.category}`}>{data.category}</Link></h3>
<p>{data.description}</p>
</div>
</div>


)

}

export default SingleItem