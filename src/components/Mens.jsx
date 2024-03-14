import {getMens} from '../API'
import {useState, useEffect} from 'react'
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
            return(<p key = {item.id}>{`${item.title}`}</p>)

        })}
    
    </div>
    )
}

export default Mens