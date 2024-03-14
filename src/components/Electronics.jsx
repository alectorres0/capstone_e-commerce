import {useState, useEffect} from 'react'
import { getElectronics } from '../API'


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
            return(<p key = {item.id}>{`${item.title}`}</p>)

        })}
    
    </div>
    )
}

export default Electronics