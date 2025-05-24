import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import {useLanguage} from '../../contexts/LanguageProvider';
import '../../styles/loginStyle.scss';
import image from '../../assets/ezgif-5-0be764f48f.png';
import LoginForm from "./LoginForm";

/**
 * Component for the login page.
 *
 * @returns {JSX.Element} The LoginPage component.
 */
const LoginPage = () => {
    const {translate} = useLanguage();

    return (
        <Grid container className="login-page">
            <Grid className="login-page__left-side">
                <LoginForm/>
            </Grid>
            <Grid className="login-page__right-side">
                <img src={image} alt="villa-des-fleurs.png"/>
                <Box className="login-comment">
                    <Typography variant="h3">
                        {translate({section: "LOGIN_PAGE", key: "RIGHT_SIDE_TITLE"})}
                    </Typography>
                    <Typography variant="text">
                        {translate({section: "LOGIN_PAGE", key: "RIGHT_SIDE_DESCRIPTION"})}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
