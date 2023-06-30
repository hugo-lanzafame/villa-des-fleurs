import React, {useState} from 'react';
import {Box, Grid, Typography} from '@mui/material';
import './loginPage.scss';
import image from '../../assets/ezgif-5-0be764f48f.png';
//Components
import LoginFormDefault from "./LoginFormDefault";
import LoginFormForgot from "./LoginFormForgot";

/**
 * Composant de la page de connexion.
 *
 * @returns {JSX.Element} Le composant LoginPage.
 */
const LoginPage = () => {
    const [isLoginForgot, setLoginForgot] = useState(false);

    /**
     * Gère le clic sur le lien "Mot de passe oublié".
     */
    const handleForgotPasswordClick = () => {
        setLoginForgot(true);
    };

    /**
     * Gère le clic sur le lien "Revenir à la page de connexion".
     */
    const handleBackToLoginClick = () => {
        setLoginForgot(false);
    };

    return (
        <Grid container className="login-page">
            <Grid item className="login-page__left-side">
                {!isLoginForgot ? (
                    <LoginFormDefault handleForgotPasswordClick={handleForgotPasswordClick}/>
                ) : (
                    <LoginFormForgot handleBackToLoginClick={handleBackToLoginClick}/>
                )}
            </Grid>
            <Grid item className="login-page__right-side">
                <img src={image} alt="villa-des-fleurs.png"/>
                <Box className="login-comment">
                    <Typography variant="h3">BIENVENUE A LA VILLA DES FLEURS</Typography>
                    <Typography variant="text">Ce site est ldsqj qdskj daz hdh jzhd,ksqhjkdsldsqhd kjd
                        sqdh.</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
