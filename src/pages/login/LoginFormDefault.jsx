import React, {useState} from 'react';
import {signInUser} from '../../firebase/auth';
import {Link} from "@mui/material";
import '../../styles/loginStyle.scss';
import PropTypes from "prop-types";
import {useNavigate} from 'react-router-dom';
import {LOGIN_FORM_TYPES} from "../../constants";
//Components
import CustomInput from "../custom/CustomInput";
import CustomForm from "../custom/CustomForm";

/**
 * Component for the login form in the login page.
 *
 * @param {Object} props - The component props.
 * @param {function} props.handleChangeFormClick - The function to handle the click on the "Forgot password" link.
 * @param {function} props.setLog - The function to handle the login logs.
 * @returns {JSX.Element} The LoginFormDefault component.
 */
const LoginFormDefault = ({handleChangeFormClick, setLog}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /**
     * Handles the change event of the form fields.
     *
     * @param {Object} e - The change event.
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
     * Handles the submission of the login form.
     *
     * @param {Object} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        signInUser(email, password)
            .then(() => {
                setLog('[default] Firebase: success (auth/valid-sign-in).');
                navigate('/');
            })
            .catch(error => {
                setLog('[default] ' + error.message);
            });
    };

    const fieldArray = [
        <CustomInput handleChange={handleChange} type='email' label='E-mail' name='email' value={email}/>,
        <CustomInput handleChange={handleChange} type='password' label='Mot de passe' name='password' value={password}/>
    ];

    return (
        <>
            <CustomForm
                titleText={'Connexion'}
                buttonText={'Se connecter'}
                linkText={'J\'ai oublier mon mot de passe'}
                fieldArray={fieldArray}
                handleSubmit={handleSubmit}
            />
            <Link onClick={() => handleChangeFormClick(LOGIN_FORM_TYPES.FORGOT)} variant="body2" className="custom-form__link">
                J'ai oublier mon mot de passe
            </Link>
        </>
    );
};
LoginFormDefault.propTypes = {
    handleChangeFormClick: PropTypes.func.isRequired,
    setLog: PropTypes.func.isRequired,
};

export default LoginFormDefault;
