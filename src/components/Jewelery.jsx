import {useState, useEffect} from 'react'
import { getJewelery } from '../API'

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
    <h1>Electronics</h1>
        {jewelery.map((item)=>{
            return(<p key = {item.id}>{`${item.title}`}</p>)

        })}
    
    </div>
    )
}

export default Jewelery