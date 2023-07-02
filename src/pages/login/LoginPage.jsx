import React, {useState} from 'react';
import {Box, Grid, Typography} from '@mui/material';
import '../../styles/loginStyle.scss';
import PropTypes from "prop-types";
import {LOGIN_FORM_TYPES} from "../../constants";
import image from '../../assets/ezgif-5-0be764f48f.png';
//Components
import LoginFormDefault from "./LoginFormDefault";
import LoginFormForgot from "./LoginFormForgot";
import CustomLog from "../custom/CustomLog";
import {Outlet} from "react-router-dom";

/**
 * Composant de la page de connexion.
 *
 * @returns {JSX.Element} Le composant LoginPage.
 */
const LoginPage = () => {
    const [form, setForm] = useState(LOGIN_FORM_TYPES.DEFAULT);
    const [log, setLog] = useState('');

    /**
     * Gère le clic sur le lien en bas de page pour changer de formulaire.
     *
     * @param {string} targetForm - Le formulaire cible à afficher ('forgot' ou 'default').
     */
    const handleChangeFormClick = (targetForm) => {
        setForm(targetForm);
        setLog('');
    };
    handleChangeFormClick.propTypes = {
        targetForm: PropTypes.oneOf([LOGIN_FORM_TYPES.FORGOT, LOGIN_FORM_TYPES.DEFAULT]).isRequired,
    };

    return (
        <Grid container className="login-page">
            <Grid item className="login-page__left-side">
                {log !== '' &&
                    <CustomLog log={log}/>
                }
                {form === LOGIN_FORM_TYPES.DEFAULT ? (
                    <LoginFormDefault handleChangeFormClick={handleChangeFormClick} setLog={setLog}/>
                ) : form === LOGIN_FORM_TYPES.FORGOT ? (
                    <LoginFormForgot handleChangeFormClick={handleChangeFormClick} setLog={setLog}/>
                ) : null}
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
