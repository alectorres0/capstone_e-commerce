import {useState,useEffect} from 'react'
import {getWomens} from '../API'
import ItemCard from './ItemCard'
const Womens = () =>{
    const [womens, setWomens] = useState([])
    useEffect(()=>{
        const getData = async () =>{
            const data = await getWomens();
            setWomens(data);
        }

        getData();

    },[])
    
    return (
    <div>
    <h1>Women's Clothing</h1>
        {womens.map((item)=>{
            return(<ItemCard key = {item.id} item = {item}/>)

        })}
    
    </div>
    )
}

export default Womens