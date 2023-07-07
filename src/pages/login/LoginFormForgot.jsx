import React, {useState} from 'react';
import {resetPassword} from '../../firebase/auth';
import {Link} from "@mui/material";
import '../../styles/loginStyle.scss';
import PropTypes from "prop-types";
import {LOGIN_FORM_TYPES} from "../../constants";
import '../../firebase/auth';
//Components
import CustomInput from "../custom/CustomInput";
import CustomForm from "../custom/CustomForm";

/**
 * Component for the password recovery form in the login page.
 *
 * @param {Object} props - The component props.
 * @param {function} props.handleChangeFormClick - The function to handle the click on the "Back to login" link.
 * @param {function} props.setLog - The function to handle the login logs.
 * @returns {JSX.Element} The LoginFormForgot component.
 */
const LoginFormForgot = ({handleChangeFormClick, setLog}) => {
    const [email, setEmail] = useState('');

    /**
     * Handles the change event of the form field.
     *
     * @param {Object} e - The change event.
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
     * Handles the submission of the password recovery form.
     *
     * @param {Object} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        resetPassword(email)
            .then(() => {
                setLog('[forgot] Firebase: success (auth/valid-reset-password).');
            })
            .catch(error => {
                setLog('[forgot] ' + error.message);
            });
    };

    const fieldArray = [
        <CustomInput handleChange={handleChange} type='email' label='E-mail' name='email' value={email}/>,
    ];

    return (
        <>
            <CustomForm
                titleText={'Récuperation'}
                buttonText={'Recuperer'}
                fieldArray={fieldArray}
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
    setLog: PropTypes.func.isRequired,
};

export default LoginFormForgot;
