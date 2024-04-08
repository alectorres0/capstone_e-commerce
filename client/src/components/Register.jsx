import {addUser, createCart} from "../API"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
const Register = ({cartId, setCartId, token, setToken,userId, setUserId, setUserInfo}) =>{
const [user, setUser] = useState({email: "", username: "", password: "", firstname: "", lastname: "", city: "",
street: "", zipcode: "", phone: ""
});
const navigate = useNavigate();
const handleSubmit = async(e) =>{
    e.preventDefault();
    const addedUser = await addUser(user);
    const cart = await createCart({userid: addedUser.user.id, token: addedUser.token});
    setCartId(cart.id);
    setToken(addedUser.token);
    setUserId(addedUser.user.id);
    console.log(addedUser);
    setUserInfo(addedUser.user);
    navigate("/account");
}

const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };
return(
    <form className = "registerForm"onSubmit = {handleSubmit}>
        <label>
            Email:
            <input name = "email" value = {user.email} onChange = {handleChange}/>
        </label><br></br>
        <label>
            Username:
            <input name = "username"value = {user.username} onChange = {handleChange}/>
        </label><br></br>
        <label>
            Password:
            <input name = "password" value = {user.password} onChange = {handleChange}/>
        </label><br></br>
        <label>
            First Name:
            <input name = "firstname" value = {user.firstname} onChange = {handleChange}/>
        </label><br></br>
        <label>
            Last Name:
            <input name = "lastname" value = {user.lastname} onChange = {handleChange}/>
        </label><br></br>
        <label>
            City:
            <input name = "city" value = {user.city} onChange = {handleChange}/>
        </label><br></br>
        <label>
            Street:
            <input name = "street" value = {user.street} onChange = {handleChange}/>
        </label><br></br>
        <label>
            Zip Code:
            <input name = "zipcode" value = {user.zipcode} onChange = {handleChange}/>
        </label><br></br>
        <label>
            Phone Number:
            <input name = "phone" value = {user.phone} onChange = {handleChange}/>
        </label>
        <button type = "submit" >Submit</button>
    </form>
)
}


export default Register