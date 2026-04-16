import { IconButton, Stack } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/routing";
import logo from '../../assets/logo-lavilladesfleurs-Carré.png';
import "../../styles/navigationStyle.scss";

/**
 * Component for the navigation bar.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar visibility on mobile.
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    return (
        <Stack className="navbar">
            <div className="navbar__left">
                <IconButton className="navbar__menu-button" onClick={toggleSidebar}>
                    <MenuIcon />
                </IconButton>
                <IconButton onClick={() => navigate(PATHS.HOME)}>
                    <img className='logo'
                        src={logo}
                        alt='VillaDesFleurs logo'
                    />
                </IconButton>
            </div>
            <IconButton onClick={() => navigate(PATHS.ACCOUNT)}>
                <AccountCircleIcon className="navbar__account-icon" />
            </IconButton>
        </Stack>
    );
};

export default Navbar;
