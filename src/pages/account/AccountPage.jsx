import React from 'react';
import {useNavigate} from 'react-router-dom';
import {signOutUser} from "../../firebase/auth";

/**
 * Component for the account page.
 *
 * @returns {JSX.Element} The AccountPage component.
 */
const AccountPage = () => {
    const navigate = useNavigate();

    /**
     * Handles the logout action.
     */
    const handleLogout = () => {
        signOutUser()
            .then(() => {
                navigate('/login');
            })
    };

    return (
        <div>
            <h1>Account Page</h1>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
};

export default AccountPage;
