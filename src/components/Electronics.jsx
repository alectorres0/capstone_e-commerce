import {useState, useEffect} from 'react'
import { getElectronics } from '../API'
import ItemCard from './ItemCard'


const Electronics = () =>{
    const [electronics, setElectronics] = useState([])
    useEffect(()=>{
        const getData = async () =>{
            const data = await getElectronics();
            setElectronics(data);
        }

        getData();

    },[])
    
    return (
    <div>
    <h1>Electronics</h1>
        {electronics.map((item)=>{
            return(<ItemCard key = {item.id} item = {item}/>)

        })}
    
    </div>
    )
}

export default Electronics