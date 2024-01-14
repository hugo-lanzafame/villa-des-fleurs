import React from "react";
import {IconButton, Stack} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../constants";
import "./navigationStyle.scss";

/**
 * Component for the navigation bar.
 *
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Stack className="navbar">
            <IconButton onClick={() => navigate(PATHS.HOME)}>
                <img className='logo'
                    src={require('../../assets/logo-lavilladesfleurs-Carré.png')}
                    alt='VillaDesFleurs logo'
                />
            </IconButton>
            <IconButton onClick={() => navigate(PATHS.ACCOUNT)}>
                <AccountCircleIcon className="navbar__account-icon"/>
            </IconButton>
        </Stack>
    );
};

export default Navbar;
