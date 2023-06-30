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
 * @param {function} props.handleChangeFormClick - La fonction de gestion du clic sur le lien "Revenir à la page de connexion".
 * @param {function} props.setLog - La fonction de gestion de log lors de la connexion".
 * @returns {JSX.Element} Le composant LoginPageForgot.
 */
const LoginFormForgot = ({handleChangeFormClick, setLog}) => {
    const [email, setEmail] = useState('');

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
            setLog('[forgot] Firebase: success (auth/valid-reset-password).');
        } catch (error) {
            setLog('[forgot] ' + error.message);
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
            handleClick={() => handleChangeFormClick('default')}
            handleSubmit={handleSubmit}
        />
    );
};
LoginFormForgot.propTypes = {
    handleChangeFormClick: PropTypes.func.isRequired,
};

export default LoginFormForgot;
