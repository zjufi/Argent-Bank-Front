import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/userSlice";

const EditUserForm = ({ user, onCancel }) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState(user?.username || "");

    const handleSave = () => {
        dispatch(updateProfile({ username }));
        onCancel(); // ferme le formulaire
    };

    return (
        <div className="edit-form">
            <h3>Edit User Info</h3>

            <label>
                Username
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label>
                First Name
                <input type="text" value={user?.firstName || ""} disabled />
            </label>

            <label>
                Last Name
                <input type="text" value={user?.lastName || ""} disabled />
            </label>

            <div className="edit-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditUserForm;
