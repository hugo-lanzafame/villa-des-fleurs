import { Box, ListItemButton, Stack, List, Typography, IconButton } from "@mui/material";
import ApartmentIcon from '@mui/icons-material/Apartment';
import BuildIcon from '@mui/icons-material/Build';
import CalculateIcon from '@mui/icons-material/Calculate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageProvider";
import { PATHS } from "../../constants/routing";
import "../../styles/navigationStyle.scss";

/**
 * Component for the navigation sidebar.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the sidebar is open on mobile.
 * @param {Function} props.onClose - Function to close the sidebar on mobile.
 * @returns {JSX.Element} The Sidebar component.
 */
const Sidebar = ({ isOpen, onClose }) => {
    const { translate } = useLanguage();
    const navigate = useNavigate();

    /**
     * Handles navigation to a specific path
     * 
     * @param {string} path - The path to navigate to
     */
    const handleNavigation = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="sidebar__overlay" onClick={onClose}></div>
            )}
            <Stack className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
                <div className="sidebar__header">
                    <IconButton className="sidebar__close-button" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <List>
                    <Box>
                        <ListItemButton className="sidebar__menu" onClick={() => handleNavigation(PATHS.HOME)}>
                            {<HomeIcon />}
                            <Typography>{translate({ section: "SIDEBAR", key: "MENU_HOME" })}</Typography>
                        </ListItemButton>
                        <ListItemButton className="sidebar__menu" onClick={() => handleNavigation(PATHS.MANAGEMENT)}>
                            {<ContentPasteIcon />}
                            <Typography>{translate({ section: "SIDEBAR", key: "MENU_MANAGEMENT" })}</Typography>
                        </ListItemButton>
                        <List disablePadding>
                            <ListItemButton className="sidebar__sub-menu" onClick={() => handleNavigation(PATHS.PROPERTIES)}>
                                {<ApartmentIcon />}
                                <Typography>{translate({ section: "SIDEBAR", key: "MENU_PROPERTIES" })}</Typography>
                            </ListItemButton>
                            <ListItemButton className="sidebar__sub-menu" onClick={() => handleNavigation(PATHS.TENANTS)}>
                                {<PeopleAltIcon />}
                                <Typography>{translate({ section: "SIDEBAR", key: "MENU_TENANTS" })}</Typography>
                            </ListItemButton>
                            <ListItemButton className="sidebar__sub-menu" onClick={() => handleNavigation(PATHS.RENTALS)}>
                                {<CalendarMonthIcon />}
                                <Typography>{translate({ section: "SIDEBAR", key: "MENU_RENTALS" })}</Typography>
                            </ListItemButton>
                        </List>
                    </Box>
                    <Box>
                        <ListItemButton className="sidebar__menu" onClick={() => handleNavigation(PATHS.TOOLS)}>
                            {<BuildIcon />}
                            <Typography>{translate({ section: "SIDEBAR", key: "MENU_TOOLS" })}</Typography>
                        </ListItemButton>
                        <List disablePadding>
                            <ListItemButton className="sidebar__sub-menu" onClick={() => handleNavigation(PATHS.RECEIPTS)}>
                                {<CalculateIcon />}
                                <Typography>{translate({ section: "SIDEBAR", key: "MENU_QUITTANCES" })}</Typography>
                            </ListItemButton>
                        </List>
                    </Box>
                </List>
            </Stack>
        </>
    )
}

export default Sidebar;