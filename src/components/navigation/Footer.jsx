import React from "react";
import {Grid, IconButton, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../constants/routing";
import "../../styles/navigationStyle.scss";

/**
 * Footer component representing the footer section of the application.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
    const navigate = useNavigate();

    return (
        <Grid container className="footer">
            <Grid item container className="footer__top" justifyContent="space-between">
                <Grid item className="footer__column">
                    <IconButton className="logo-container" onClick={() => navigate(PATHS.HOME)}>
                        <img className="logo-rectangle"
                             src={require('../../assets/logo-lavilladesfleurs-Rectangle.png')}
                             alt='VillaDesFleurs logo'/>
                        <img className="logo-square"
                             src={require('../../assets/logo-lavilladesfleurs-Carré.png')}
                             alt='VillaDesFleurs logo'/>
                    </IconButton>
                </Grid>
                <Grid item className="footer__column">
                    <Typography className="footer__title">Contact</Typography>
                    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Typography>
                </Grid>
            </Grid>
            <Grid item container className="footer__bottom">
                <Typography>© 2023-2025 <b>LaVillaDesFleurs</b>. All rights reserved.</Typography>
                <Typography>Created by <b>Hugo Lanzafame</b></Typography>
            </Grid>
        </Grid>
    );
};

export default Footer;