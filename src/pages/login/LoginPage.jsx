import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import '../../styles/loginStyle.scss';
import image from '../../assets/ezgif-5-0be764f48f.png';
//Components
import LoginForm from "./LoginForm";

/**
 * Component for the login page.
 *
 * @returns {JSX.Element} The LoginPage component.
 */
const LoginPage = () => {
    return (
        <Grid container className="login-page">
            <Grid item className="login-page__left-side">
                <LoginForm/>
            </Grid>
            <Grid item className="login-page__right-side">
                <img src={image} alt="villa-des-fleurs.png"/>
                <Box className="login-comment">
                    <Typography variant="h3">BIENVENUE A LA VILLA DES FLEURS</Typography>
                    <Typography variant="text">Ce site est cool.</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
