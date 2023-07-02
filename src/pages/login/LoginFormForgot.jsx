import React, {useState} from 'react';
import {passwordReset} from '../../firebase/auth';
import '../../styles/loginStyle.scss';
import PropTypes from "prop-types";
import {LOGIN_FORM_TYPES} from "../../constants";
import '../../firebase/auth';
//Components
import CustomInput from "../custom/CustomInput";
import CustomForm from "../custom/CustomForm";
import {Link} from "@mui/material";

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
        setEmail(e.target.value);
    };

    /**
     * Gère la soumission du formulaire de connexion.
     * @param {Object} e - L'événement de soumission du formulaire.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        await passwordReset(email, setLog)
    };

    const loginInputArray = [
        <CustomInput handleChange={handleChange} type='email' label='E-mail' name='email' value={email}/>,
    ];

    return (
        <>
            <CustomForm
                titleText={'Récuperation'}
                buttonText={'Recuperer'}
                loginInputArray={loginInputArray}
                handleSubmit={handleSubmit}
            />
            <Link onClick={() => handleChangeFormClick(LOGIN_FORM_TYPES.DEFAULT)} variant="body2" className="custom-form__link">
                Revenir a la page de connexion
            </Link>
        </>
    );
};
LoginFormForgot.propTypes = {
    handleChangeFormClick: PropTypes.func.isRequired,
};

export default LoginFormForgot;
