import React from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import '../../styles/loginStyle.scss';
import '../../styles/globalStyle.scss';
import PropTypes from "prop-types";

/**
 * Composant du formulaire personnalisé à utiliser dans la page LoginPage.
 *
 * @param {Object} props - Les props du composant.
 * @param {string} props.titleText - Le texte du titre du formulaire.
 * @param {function} props.handleSubmit - La fonction de gestion de la soumission du formulaire.
 * @param {Array<LoginInput>} props.loginInputArray - Le tableau des composants LoginInput à afficher dans le formulaire.
 * @param {string} props.buttonText - Le texte du bouton de soumission du formulaire.
 * @returns {JSX.Element} Le composant LoginForm.
 */
const CustomForm = ({titleText, handleSubmit, loginInputArray, buttonText}) => {
    return (
        <Box className="custom-form">
            <Typography variant="h2" className="custom-form__title">{titleText}</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container className="custom-form__input-container">
                    {loginInputArray.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                    <Grid item>
                        <Button type="submit" variant="contained" className="custom-form__button">
                            {buttonText}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
CustomForm.propTypes = {
    titleText: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loginInputArray: PropTypes.arrayOf(PropTypes.element).isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default CustomForm;
