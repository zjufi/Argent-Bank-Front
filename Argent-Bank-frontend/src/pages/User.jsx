import React from 'react';
import { useSelector } from 'react-redux';
import AccountCard from '../components/accountcards';
import AccountCardsData from '../data/AccountcardsData.json';
import "../styles/pages/user.css";


function User() {
    const user = useSelector((state) => state.auth.user); // récupère l'utilisateur depuis Redux
    const firstName = user?.firstName || user?.name || ""; // récupère le prénom 

    return (
        <>
            <main>
                <div className="bg-dark">
                <div className="user-header">
                    <h2>Welcome back<br />{firstName}!</h2>
                    <button className="edit-button">Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                {AccountCardsData.map((account) => (
                    <AccountCard
                        key={account.id}
                        title={account.title}
                        amount={account.amount}
                        description={account.description}
                    />
                ))}
            </div>
        </main >
            
        </> 
    );
}

export default User;
