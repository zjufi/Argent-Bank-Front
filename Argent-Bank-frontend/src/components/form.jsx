import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchUserProfile, logout } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, user, status, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Gestion de la soumission du formulaire
    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) return alert("Veuillez remplir tous les champs");

        dispatch(loginUser({ email, password }));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    // Redirection immédiate après connexion
    useEffect(() => {
        if (token) {
            navigate('/user');           // Redirection immédiate
            if (!user) dispatch(fetchUserProfile()); // Récupération du profil en arrière-plan
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
                <form onSubmit={handleLogin} noValidate>
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mot de passe"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Connexion...' : 'Se connecter'}
                    </button>

                    {status === 'failed' && error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            )}
        </div>
    );
}

export default LoginForm;
