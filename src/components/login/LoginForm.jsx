import React, {useState} from 'react';
import {resetPassword, signInUser} from '../../firebase/auth';
import {Link} from "@mui/material";
import '../../styles/loginStyle.scss';
import PropTypes from "prop-types";
import {LOGIN_FORM_TYPES} from "../../constants";
import '../../firebase/auth';
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../context/LanguageProvider";
//Components
import CustomInput from "../global/CustomInput";
import CustomForm from "../global/CustomForm";
import CustomLog from "../global/CustomLog";

/**
 * Component for the authentification/password recovery form in the login page.
 *
 * @returns {JSX.Element} The LoginFormForgot component.
 */
const LoginForm = () => {
    const {translate} = useLanguage();
    const [form, setForm] = useState(LOGIN_FORM_TYPES.LOGIN);
    const [log, setLog] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /**
     * Handles the click event on the link at the bottom of the page to switch forms.
     *
     * @param {string} targetForm - The target form to display ('forgot' or 'default').
     */
    const handleChangeFormClick = (targetForm) => {
        setForm(targetForm);
        setLog('');
    };
    handleChangeFormClick.propTypes = {
        targetForm: PropTypes.oneOf([LOGIN_FORM_TYPES.FORGOT, LOGIN_FORM_TYPES.LOGIN]).isRequired,
    };


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
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    };

    /**
     * Handles the submission of the authentification/password recovery form.
     *
     * @param {Object} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        switch (form) {
            case LOGIN_FORM_TYPES.LOGIN:
                signInUser(email, password)
                    .then(() => {
                        setLog('[default] Firebase: success (auth/valid-sign-in).');
                        navigate('/');
                    })
                    .catch(error => {
                        setLog('[default] ' + error.message);
                    });
                break;
            case LOGIN_FORM_TYPES.FORGOT:
                resetPassword(email)
                    .then(() => {
                        setLog('[forgot] Firebase: success (auth/valid-reset-password).');
                    })
                    .catch(error => {
                        setLog('[forgot] ' + error.message);
                    });
                break;
            default:
                break;
        }
    };

    const fieldArrayLogin = [
        <CustomInput
            onChange={handleChange}
            type='email'
            label={translate({section:"LOGIN_PAGE", key:"LOGIN_FORM_LABEL_EMAIL"})}
            name='email'
            value={email}/>,
        <CustomInput
            onChange={handleChange}
            type='password'
            label={translate({section:"LOGIN_PAGE", key:"LOGIN_FORM_LABEL_PASSWORD"})}
            name='password'
            value={password}/>
    ];

    const fieldArrayForgot = [
        <CustomInput
            onChange={handleChange}
            type='email'
            label={translate({section:"LOGIN_PAGE", key:"FORGOT_FORM_LABEL_EMAIL"})}
            name='email'
            value={email}/>,
    ];

    switch (form) {
        case LOGIN_FORM_TYPES.LOGIN:
            return (
                <>
                    {log !== '' &&
                        <CustomLog log={log}/>
                    }
                    <CustomForm
                        titleText={translate({section:"LOGIN_PAGE", key:"LOGIN_FORM_TITLE"})}
                        buttonText={translate({section:"LOGIN_PAGE", key:"LOGIN_FORM_BUTTON_LOGIN"})}
                        fieldArray={fieldArrayLogin}
                        handleSubmit={handleSubmit}
                    />
                    <Link onClick={() => handleChangeFormClick(LOGIN_FORM_TYPES.FORGOT)}
                          variant="body2"
                          className="custom-form__link">
                        {translate({section:"LOGIN_PAGE", key:"LOGIN_FORM_BUTTON_TO_FORGOT"})}
                    </Link>
                </>
            );
        case LOGIN_FORM_TYPES.FORGOT:
            return (
                <>
                    {log !== '' &&
                        <CustomLog log={log}/>
                    }
                    <CustomForm
                        titleText={translate({section:"LOGIN_PAGE", key:"FORGOT_FORM_TITLE"})}
                        buttonText={translate({section:"LOGIN_PAGE", key:"FORGOT_FORM_BUTTON_FORGOT"})}
                        fieldArray={fieldArrayForgot}
                        handleSubmit={handleSubmit}
                    />
                    <Link onClick={() => handleChangeFormClick(LOGIN_FORM_TYPES.LOGIN)}
                          variant="body2"
                          className="custom-form__link">
                        {translate({section:"LOGIN_PAGE", key:"FORGOT_FORM_BUTTON_TO_LOGIN"})}
                    </Link>
                </>
            );
        default:
            break;
    }
};

export default LoginForm;
