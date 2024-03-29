import {getMens} from '../API'
import {useState, useEffect} from 'react'
import ItemCard from './ItemCard'
const Mens = () =>{

    const [mens, setMens] = useState([])
    useEffect(()=>{
        const getData = async () =>{
            const data = await getMens();
            setMens(data);
        }

        getData();

    },[])
    
    return (
    <div>
    <h1>Men's Clothing</h1>
        {mens.map((item)=>{
            return(<ItemCard key = {item.id} item = {item}/>)

        })}
    
    </div>
    )
}

export default Mens