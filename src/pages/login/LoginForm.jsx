import React from 'react';
import {Box, Button, Grid, Link, Typography} from "@mui/material";
import './loginPage.scss';
import PropTypes from "prop-types";

/**
 * Composant du formulaire personnalisé à utiliser dans la page LoginPage.
 *
 * @param {Object} props - Les props du composant.
 * @param {string} props.titleText - Le texte du titre du formulaire.
 * @param {function} props.handleSubmit - La fonction de gestion de la soumission du formulaire.
 * @param {Array<LoginInput>} props.loginInputArray - Le tableau des composants LoginInput à afficher dans le formulaire.
 * @param {string} props.buttonText - Le texte du bouton de soumission du formulaire.
 * @param {string} props.linkText - Le texte du lien dans le formulaire.
 * @param {function} props.handleClick - La fonction de gestion du clic sur le lien dans le formulaire.
 * @returns {JSX.Element} Le composant LoginForm.
 */
const LoginForm = ({titleText, handleSubmit, loginInputArray, buttonText, linkText, handleClick}) => {
    return (
        <Box className="login-form">
            <Typography variant="h2" className="login-form__title">{titleText}</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container className="login-form__form">
                    {loginInputArray.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                    <Grid item>
                        <Button type="submit" variant="contained" className="login-form__button">
                            {buttonText}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Link onClick={handleClick} variant="body2" className="login-form__link">{linkText}</Link>
        </Box>
    );
};
LoginForm.propTypes = {
    titleText: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loginInputArray: PropTypes.arrayOf(PropTypes.element).isRequired,
    buttonText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default LoginForm;
