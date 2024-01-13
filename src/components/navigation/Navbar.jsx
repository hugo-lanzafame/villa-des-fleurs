import React from "react";
import {PATHS} from '../../constants';
import {AppBar, IconButton, Stack, Toolbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/**
 * Component for the navigation bar.
 *
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position='static' sx={{backgroundColor: '#302F37', borderBottom: '#000000'}}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '64px',
                overflowY: 'auto',
            }}>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <img
                        src={require('../../assets/logo-lavilladesfleurs-Rectangle.png')}
                        alt='VillaDesFleurs logo'
                        onClick={() => navigate(PATHS.HOME)}
                        style={{height: '56px', cursor: 'pointer'}}
                    />
                </Stack>
                <IconButton onClick={() => navigate(PATHS.ACCOUNT)}>
                    <AccountCircleIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
