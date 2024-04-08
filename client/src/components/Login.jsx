import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {userLogin, fetchCart} from '../API'

const Login = ({cartId, setCartId,token,setToken,userId, setUserId, setUserInfo}) =>{
const [user,setUser] = useState({username: "",password: ""})
const navigate = useNavigate();
const handleSubmit = async(e) =>{
    e.preventDefault();
    const data = await userLogin(user);
    const cart = await fetchCart({userid: data.user.id, token: data.token});
    setCartId(cart.id);
    setToken(data.token);
    setUserId(data.user.id);
    console.log(data);
    setUserInfo(data.user);
    navigate("/account")
}


const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };
return(
  <div>
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

        <p>Don't have an account? <Link to = "/register">Register</Link></p>
        </div>
)
}

export default Login