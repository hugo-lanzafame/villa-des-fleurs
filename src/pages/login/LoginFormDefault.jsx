import React, {useState} from 'react';
import {signIn} from '../../firebase/auth';
import './loginPage.scss';
import PropTypes from "prop-types";
import {LOGIN_FORM_TYPES} from "../../constants";
//Components
import LoginInput from "./LoginInput";
import LoginForm from "./LoginForm";

/**
 * Composant de formulaire de connexion de la page de connexion.
 *
 * @param {Object} props - Les props du composant.
 * @param {function} props.handleChangeFormClick - La fonction de gestion du clic sur le lien "Mot de passe oublié".
 * @param {function} props.setLog - La fonction de gestion de logs lors de la connexion".
 * @returns {JSX.Element} Le composant LoginFormDefault.
 */
const LoginFormDefault = ({handleChangeFormClick, setLog}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        await signIn(email, password, setLog);
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
            handleClick={() => handleChangeFormClick(LOGIN_FORM_TYPES.FORGOT)}
            handleSubmit={handleSubmit}
        />
    );
};
LoginFormDefault.propTypes = {
    handleChangeFormClick: PropTypes.func.isRequired,
};

export default LoginFormDefault;
