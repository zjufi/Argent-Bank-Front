import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserProfile, logout } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, user, status, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) return alert("Veuillez remplir tous les champs");

        dispatch(loginUser({ email, password }));

        // Sauvegarde dans localStorage si "Remember me" est coché
        if (rememberMe) {
            localStorage.setItem("rememberMe", email);
        } else {
            localStorage.removeItem("rememberMe");
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    // Pré-remplissage si l’utilisateur avait coché "Remember me"
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberMe");
        if (savedEmail) setEmail(savedEmail);
    }, []);

    // Redirection après connexion
    useEffect(() => {
        if (token) {
            navigate("/user"); // Redirection immédiate
            if (!user) dispatch(fetchUserProfile()); // Récupération du profil
        }
    }, [token, user, dispatch, navigate]);

    return (
        <div>
            {user ? (
                <div>
                    <p>Bonjour, {user.userName || user.email}</p>
                    <button onClick={handleLogout}>Déconnexion</button>
                </div>
            ) : (
                <section className="sign-in-content">
                    <i className="fa-solid fa-circle-user sign-in-icon"></i>
                    <h1>Sign In</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-remember">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>

                        <button
                            type="submit"
                            className="sign-in-button"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Connexion..." : "Sign In"}
                        </button>

                        {status === "failed" && error && (
                            <p className="error-message">{error}</p>
                        )}
                    </form>
                </section>
            )}
        </div>
    );
}

export default LoginForm;
