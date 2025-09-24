import React, { useState,} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth"; 
import "../styles/pages/login.css";


function Login() {
    const [email, setEmail] = useState("");   
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const token = await login(email, password); // appel API
            console.log("Connexion réussie ✅, token :", token);
            navigate ("/user");
          
        } catch (err) {
            setError("Échec de connexion. Vérifie ton email et ton mot de passe.");
        }
    }

    return (
        <div className="bg-dark">
            <div className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1 className="sign-in-title">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        Sign In
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
