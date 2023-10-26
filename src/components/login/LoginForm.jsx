import React, {useState} from 'react';
import {Box, Button, Grid, Link, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {resetPassword, signInUser} from '../../firebase/auth';
import '../../styles/loginStyle.scss';
import {LOGIN_FORM_TYPES} from "../../constants";
import '../../firebase/auth';
import {useLanguage} from "../../context/LanguageProvider";
//Components
import CustomInput from "../global/CustomInput";
import CustomLog from "../global/CustomLog";

/**
 * Component for the authentification/password recovery form in the login page.
 *
 * @returns {JSX.Element} The `LoginForm` component.
 */
const LoginForm = () => {
    const [form, setForm] = useState(LOGIN_FORM_TYPES.LOGIN);
    const [log, setLog] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {translate} = useLanguage();
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
        targetForm: PropTypes.oneOf(Object.values(LOGIN_FORM_TYPES)).isRequired,
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

    /**
     * Retrieves the form configuration based on the form state.
     *
     * @returns {Object|null} The form configuration or null if the form state is unknown.
     */
    const getFormConfig = () => {
        const commonConfig = {
            log: log !== '',
        };

        switch (form) {
            case LOGIN_FORM_TYPES.LOGIN:
                return {
                    ...commonConfig,
                    title: translate({section: "LOGIN_PAGE", key: "LOGIN_FORM_TITLE"}),
                    inputs: [
                        {
                            type: 'email',
                            label: translate({section: "LOGIN_PAGE", key: "LOGIN_FORM_LABEL_EMAIL"}),
                            name: 'email',
                            value: email,
                        },
                        {
                            type: 'password',
                            label: translate({section: "LOGIN_PAGE", key: "LOGIN_FORM_LABEL_PASSWORD"}),
                            name: 'password',
                            value: password,
                        },
                    ],
                    buttonLabel: translate({section: "LOGIN_PAGE", key: "LOGIN_FORM_BUTTON_LOGIN"}),
                    linkTo: LOGIN_FORM_TYPES.FORGOT,
                    linkLabel: translate({section: "LOGIN_PAGE", key: "LOGIN_FORM_BUTTON_TO_FORGOT"}),
                };
            case LOGIN_FORM_TYPES.FORGOT:
                return {
                    ...commonConfig,
                    title: translate({section: "LOGIN_PAGE", key: "FORGOT_FORM_TITLE"}),
                    inputs: [
                        {
                            type: 'email',
                            label: translate({section: "LOGIN_PAGE", key: "FORGOT_FORM_LABEL_EMAIL"}),
                            name: 'email',
                            value: email,
                        },
                    ],
                    buttonLabel: translate({section: "LOGIN_PAGE", key: "FORGOT_FORM_BUTTON_FORGOT"}),
                    linkTo: LOGIN_FORM_TYPES.LOGIN,
                    linkLabel: translate({section: "LOGIN_PAGE", key: "FORGOT_FORM_BUTTON_TO_LOGIN"}),
                };
            default:
                return null;
        }
    };

    const formConfig = getFormConfig();

    if (formConfig) {
        return (
            <>
                {formConfig.log &&
                    <CustomLog log={log}/>
                }
                <Box className="custom-form">
                    <Typography variant="h2" className="custom-form__title">
                        {formConfig.title}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container className="custom-form__field-container">
                            {formConfig.inputs.map((input, index) => (
                                <CustomInput
                                    key={index}
                                    onChange={handleChange}
                                    type={input.type}
                                    label={input.label}
                                    name={input.name}
                                    value={input.value}
                                />
                            ))}
                            <Grid item>
                                <Button type="submit" variant="contained" className="custom-form__button">
                                    {formConfig.buttonLabel}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <Link onClick={() => handleChangeFormClick(formConfig.linkTo)} variant="body2"
                      className="custom-form__link">
                    {formConfig.linkLabel}
                </Link>
            </>
        );
    }
};

export default LoginForm;
