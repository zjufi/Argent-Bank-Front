import React from 'react';
import { useSelector } from 'react-redux';
import AccountCard from '../components/accountcards';
import "../styles/pages/user.css";

function User() {
    const user = useSelector((state) => state.auth.user); // récupère l'utilisateur depuis Redux
    const firstName = user?.firstName || user?.name || ""; // récupère le prénom ou nom

    const accounts = [
        { title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" },
        { title: "Argent Bank Savings (x6712)", amount: "$10,928.42", description: "Available Balance" },
        { title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" },
    ];

    return (
        <div className="main-bg-dark">
            <div className='Header-user'>
                <h1>Welcome Back {firstName}</h1>
                <button className='button-user'>Edit Name</button>
            </div>
            <div className='accounts'>
                <h2>Sr Only</h2>
                {accounts.map((acc, index) => (
                    <AccountCard key={index} {...acc} />
                ))}
            </div>
        </div>
    );
}

export default User;
