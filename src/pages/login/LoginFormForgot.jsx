import React, {useState} from 'react';
import './loginPage.scss';
import PropTypes from "prop-types";
//Components
import LoginInput from "./LoginInput";
import LoginForm from "./LoginForm";
//Firebase
import app from '../../firebaseConfig';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

const auth = getAuth(app);

/**
 * Composant de formulaire de récupération de mot de passe de la page de connexion.
 *
 * @param {Object} props - Les props du composant.
 * @param {function} props.handleBackToLoginClick - La fonction de gestion du clic sur le lien "Revenir à la page de connexion".
 * @returns {JSX.Element} Le composant LoginPageForgot.
 */
const LoginFormForgot = ({handleBackToLoginClick}) => {
    const [email, setEmail] = useState('');
    // const [error, setError] = useState('');

    /**
     * Gère le changement de valeur des champs du formulaire.
     * @param {Object} e - L'événement de changement.
     */
    const handleChange = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            default:
                break;
        }
    };

    /**
     * Gère la soumission du formulaire de connexion.
     * @param {Object} e - L'événement de soumission du formulaire.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            console.log('Email de réinitialisation du mot de passe envoyé.');
        } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'envoi de l\'e-mail de réinitialisation du mot de passe:', error);
        }
    };

    const loginInputArray = [
        <LoginInput handleChange={handleChange} type='email' label='E-mail' name='email' value={email}/>,
    ];

    return (
        <LoginForm
            titleText={'Récuperation'}
            buttonText={'Recuperer'}
            linkText={'Revenir a la page de connexion'}
            loginInputArray={loginInputArray}
            handleClick={handleBackToLoginClick}
            handleSubmit={handleSubmit}
        />
    );
};

LoginFormForgot.propTypes = {
    handleBackToLoginClick: PropTypes.func.isRequired,
};

export default LoginFormForgot;
