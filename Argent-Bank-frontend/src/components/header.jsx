import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/argentBankLogo.png";
import "../styles/components/header.css";
import "../index.css";

import { isAuthenticated } from "../services/auth";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(isAuthenticated());
  const [userName, setUserName] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated()) {
      setIsLoggedIn(true);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserName(parsedUser.name || "");
        } catch (error) {
          console.error("Erreur parsing user:", error);
        }
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault(); // empêche le rechargement
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <img className="main-nav-logo" src={Logo} alt="logo" />

      <ul>
        {!isLoggedIn && (
          <li>
            <Link to="/login">
              Sign In
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <>
            <li>
              <Link to="/user">
                <i className="fa fa-user-circle"></i>{" "}
                {userName || "Mon Profil"}
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i> Sign Out
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
