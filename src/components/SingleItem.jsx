import {useParams} from "react-router-dom"
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
<>
<p>{data.title}</p>

</>

)

}

export default SingleItem