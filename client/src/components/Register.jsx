import {addUser} from "../API"
import {useState} from "react"
const Register = () =>{
const [user, setUser] = useState({email: "", username: "", password: "", firstname: "", lastname: "", city: "",
street: "", zipcode: "", phone: ""
});
const handleSubmit = async(e) =>{
    e.preventDefault();
    const data = await addUser(user);
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
            Email:
            <input name = "email" value = {user.email} onChange = {handleChange}/>
        </label>
        <label>
            Username:
            <input name = "username"value = {user.username} onChange = {handleChange}/>
        </label>
        <label>
            Password:
            <input name = "password" value = {user.password} onChange = {handleChange}/>
        </label>
        <label>
            First Name:
            <input name = "firstname" value = {user.firstname} onChange = {handleChange}/>
        </label>
        <label>
            Last Name:
            <input name = "lastname" value = {user.lastname} onChange = {handleChange}/>
        </label>
        <label>
            City:
            <input name = "city" value = {user.city} onChange = {handleChange}/>
        </label>
        <label>
            Street:
            <input name = "street" value = {user.street} onChange = {handleChange}/>
        </label>
        <label>
            Zip Code:
            <input name = "zipcode" value = {user.zipcode} onChange = {handleChange}/>
        </label>
        <label>
            Phone Number:
            <input name = "phone" value = {user.phone} onChange = {handleChange}/>
        </label>
        <button type = "submit">Submit</button>
    </form>
)
}


export default Register