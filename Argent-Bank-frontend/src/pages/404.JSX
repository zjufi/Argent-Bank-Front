import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/404.scss";

function NotFound() {
  return (
    <main className="main bg-dark">
      <div className="notfound-container">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">Oups! La page que vous demandez n'existe pas.</p>
        <Link to="/" className="notfound-link">Retourner sur la page d'accueil</Link>
      </div>
    </main>
  );
}

export default NotFound;
