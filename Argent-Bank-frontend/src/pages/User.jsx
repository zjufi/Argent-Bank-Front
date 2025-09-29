import React, { useState } from "react";
import { useSelector } from "react-redux";
import AccountCard from "../components/accountcards";
import AccountCardsData from "../data/AccountcardsData.json";
import EditUserForm from "../components/EditUser";
import "../styles/components/EditUser.scss";
import "../styles/pages/user.scss";

function User() {
    const user = useSelector((state) => state.auth.user);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="bg-dark">
            <div className="user-header">
                {isEditing ? (
                    <EditUserForm user={user} onCancel={() => setIsEditing(false)} />
                ) : (
                    <>
                        <h2>
                            Welcome back
                            <br />
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <button
                            className="edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Name
                        </button>
                    </>
                )}
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
    );
}

export default User;
