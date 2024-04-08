

const Account = ({userInfo}) =>{

return(
    <>
    <h1>Account</h1>
    <div className = "accountInfo">
        <h2>First Name: {userInfo.firstname}</h2>
        <h2>Last Name: {userInfo.lastname}</h2>
        <h2>Username: {userInfo.username}</h2>
        <h2>Email: {userInfo.email}</h2>
        <h2>Phone: {userInfo.phone}</h2>
    </div>
    </>
)


}




export default Account;