import React, {useState} from 'react';
import './loginPage.scss';
import PropTypes from "prop-types";
//Components
import LoginInput from "./LoginInput";
import LoginForm from "./LoginForm";
//Firebase
import app from '../../firebaseConfig';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const auth = getAuth(app);

/**
 * Composant de formulaire de connexion de la page de connexion.
 *
 * @param {Object} props - Les props du composant.
 * @param {function} props.handleForgotPasswordClick - La fonction de gestion du clic sur le lien "Mot de passe oublié".
 * @returns {JSX.Element} Le composant LoginFormDefault.
 */
const LoginFormDefault = ({handleForgotPasswordClick}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            case 'password':
                setPassword(e.target.value);
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
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Connexion réussie');
        } catch (error) {
            console.log('Connexion échouée');
        }
    };

    const loginInputArray = [
        <LoginInput handleChange={handleChange} type='email' label='E-mail' name='email' value={email}/>,
        <LoginInput handleChange={handleChange} type='password' label='Mot de passe' name='password' value={password}/>
    ];

    return (
        <LoginForm
            titleText={'Connexion'}
            buttonText={'Se connecter'}
            linkText={'J\'ai oublier mon mot de passe'}
            loginInputArray={loginInputArray}
            handleClick={handleForgotPasswordClick}
            handleSubmit={handleSubmit}
        />
    );
};

LoginFormDefault.propTypes = {
    handleForgotPasswordClick: PropTypes.func.isRequired,
};

export default LoginFormDefault;
