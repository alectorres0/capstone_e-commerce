import {useState,useEffect} from 'react'
import {getWomens} from '../API'

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
            return(<p key = {item.id}>{`${item.title}`}</p>)

        })}
    
    </div>
    )
}

export default Womens