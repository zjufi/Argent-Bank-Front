import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/argentBankLogo.png";
import "../styles/components/header.css";

import "../index.css";

function Header() {
  return (
    <nav className="main-nav">
        <img className="main-nav-logo" src={Logo} alt="logo" />
        <div>
              <Link to="/login" className="main-nav-item">
                  <i className="fa fa-user-circle"></i>
                  Sign In
              </Link>
        </div>
    </nav>
  );
}
export default Header;