import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import  "../Css/WebsiteLayout.css";
<style>
    
</style>
const WebsiteLayout = () => {
  return (
    <div>  <header>
    <nav>
        <ul>
            
            <li> <Link to={"/"}>Home</Link></li>
            <li> <Link to={"/logup"}>Signup</Link> </li>
            <li> <Link to={"/login"}>Signin</Link></li>
            
        </ul>
    </nav>
    <div className="banner">
        <img src="https://picsum.photos/1920/300" alt="" />
    </div>
</header>
<main>
    <Outlet />
</main>
<footer>
    <span>Copyright Assm ...</span>
</footer></div>
  )
}

export default WebsiteLayout