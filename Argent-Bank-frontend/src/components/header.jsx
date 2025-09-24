import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/argentBankLogo.png";
import "../styles/components/header.css";

import "../index.css";



function Header() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="main-nav">
      <img className="main-nav-logo" src={Logo} alt="logo" />
      <ul>
        {!isLoggedIn && <li><Link to="/login">Sign In</Link></li>}
        {isLoggedIn && <li><Link to="/user">Sign Up</Link></li>}
      </ul>
      {isLoggedIn && (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            navigate("/");
          }}
        >
          Sign Out
        </button>
      )}  
    
    </nav>
  );
}
export default Header;