import {useState, useEffect} from 'react'
import { getJewelery } from '../API'
import ItemCard from './ItemCard'
const Jewelery = () =>{
    const [jewelery, setJewelery] = useState([])
    useEffect(()=>{
        const getData = async () =>{
            const data = await getJewelery();
            setJewelery(data);
        }

        getData();

    },[])
    
    return (
    <div>
    <h1>Jewelery</h1>
        {jewelery.map((item)=>{
            return(<ItemCard key = {item.id} item = {item}/>)

        })}
    
    </div>
    )
}

export default Jewelery