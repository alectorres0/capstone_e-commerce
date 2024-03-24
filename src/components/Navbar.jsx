import {Link} from "react-router-dom"

const Navbar = () =>{
    return (
        <header className = "navBar">
    <nav >
        <ul>
        <li><Link to ="/">Home</Link></li>
        <li><Link to ="/men's clothing">Men's Clothing</Link></li>
        <li><Link to = "/women's clothing">Women's Clothing</Link></li>
        <li><Link to = "/electronics">Electronics</Link></li>
        <li><Link to = "/jewelery">Jewelery</Link></li>
        <li><Link to = "/register">Register</Link></li>
        </ul>
    </nav>
    </header>
    )

}

export default Navbar