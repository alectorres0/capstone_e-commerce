import {useNavigate} from "react-router-dom"

const Account = ({userInfo, setToken}) =>{
const navigate = useNavigate();
return(
    <>
    <h1>Account</h1>
    <div className = "accountInfo">
        <h2>First Name: {userInfo.firstname}</h2>
        <h2>Last Name: {userInfo.lastname}</h2>
        <h2>Username: {userInfo.username}</h2>
        <h2>Email: {userInfo.email}</h2>
        <h2>Phone: {userInfo.phone}</h2>
        <button onClick = {()=>{navigate("/login"); setToken(null)}}>Log Out</button>
    </div>
    </>
)


}




export default Account;