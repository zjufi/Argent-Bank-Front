import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/AuthSlice"; // adapte le chemin
import Logo from "../img/argentBankLogo.png";
import "../styles/components/header.css";
import "../index.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Récupérer token et user depuis Redux
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const isLoggedIn = Boolean(token);
  const userName = user?.firstName || user?.name || user?.userName || "";

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("📌 Logout clicked");
    dispatch(logout());
    navigate("/");
  };

  console.log("📌 Header render - isLoggedIn:", isLoggedIn, "userName:", userName);

  return (
    <nav className="main-nav">
      <img className="main-nav-logo" src={Logo} alt="logo" />

      <ul>
        {!isLoggedIn && (
          <li>
            <Link to="/login">
              <i className="fa fa-user-circle"></i> Sign In
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <>
            <li>
              <Link to="/user">
                <i className="fa fa-user-circle"></i> {userName || "Mon Profil"}
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
