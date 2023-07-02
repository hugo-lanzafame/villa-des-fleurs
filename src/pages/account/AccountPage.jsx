import React from 'react';
import {useNavigate} from 'react-router-dom';
import { auth } from "../../firebase/auth";

const AccountPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Déconnexion de l'utilisateur
        auth.signOut().then(() => {
            // Rediriger vers la page de connexion après la déconnexion
            navigate('/login');
        }).catch((error) => {
            // Gérer les erreurs de déconnexion
            console.error('Erreur lors de la déconnexion :', error);
        });
    };

    return (
        <div>
            <h1>Account Page</h1>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
};

export default AccountPage;
