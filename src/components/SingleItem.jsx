import {useParams} from "react-router-dom"
import {getItem} from "../API"
import {useState, useEffect} from "react"
const SingleItem = () =>{
const {id} = useParams();
const [data, setData] = useState({});

useEffect(()=>{
const getData = async() =>{
setData(await getItem(id));

}
getData();
},[])

return(
<>
<p>{data.item}</p>

</>

)

}

export default SingleItem