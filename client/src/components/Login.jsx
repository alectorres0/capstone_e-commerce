import {useState} from 'react'
import {userLogin} from '../API'

const Login = () =>{
const [user,setUser] = useState({username: "",password: ""})

const handleSubmit = async(e) =>{
    e.preventDefault();
    const data = await userLogin(user);
    console.log(data);
}


const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };
return(
    <form onSubmit = {handleSubmit}>
        <label>
            Username:
            <input name = "username" value = {user.username} onChange = {handleChange}/>
        </label>
        <label>
           Password:
            <input name = "password"value = {user.password} onChange = {handleChange}/>
        </label>
        <button type = "submit">Submit</button>
        </form>

)
}

export default Login