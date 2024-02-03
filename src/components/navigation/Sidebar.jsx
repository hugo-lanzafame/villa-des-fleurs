import React from "react";
import {Box, ListItemButton, Stack, List, Typography} from "@mui/material";
import ApartmentIcon from '@mui/icons-material/Apartment';
import BuildIcon from '@mui/icons-material/Build';
import CalculateIcon from '@mui/icons-material/Calculate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../contexts/LanguageProvider";
import {PATHS} from "../../constants/routing";
import "../../styles/navigationStyle.scss";

/**
 * Component for the navigation sidebar.
 *
 * @returns {JSX.Element} The Sidebar component.
 */
const Sidebar = () => {
    const {translate} = useLanguage();
    const navigate = useNavigate();

    return (
        <Stack className="sidebar">
            <List>
                <Box>
                    <ListItemButton className="sidebar__menu"
                                    onClick={() => navigate(PATHS.HOME)}>
                        {<HomeIcon/>}
                        <Typography>{translate({section: "SIDEBAR", key: "MENU_HOME"})}</Typography>
                    </ListItemButton>
                    <ListItemButton className="sidebar__menu"
                                    onClick={() => navigate(PATHS.MANAGEMENT)}>
                        {<ContentPasteIcon/>}
                        <Typography>{translate({section: "SIDEBAR", key: "MENU_MANAGEMENT"})}</Typography>
                    </ListItemButton>
                    <List disablePadding>
                        <ListItemButton className="sidebar__sub-menu"
                                        onClick={() => navigate(PATHS.PROPERTIES)}>
                            {<ApartmentIcon/>}
                            <Typography>{translate({section: "SIDEBAR", key: "MENU_PROPERTIES"})}</Typography>
                        </ListItemButton>
                        <ListItemButton className="sidebar__sub-menu"
                                        onClick={() => navigate(PATHS.TENANTS)}>
                            {<PeopleAltIcon/>}
                            <Typography>{translate({section: "SIDEBAR", key: "MENU_TENANTS"})}</Typography>
                        </ListItemButton>
                        <ListItemButton className="sidebar__sub-menu"
                                        onClick={() => navigate(PATHS.HOME)}>
                            {<CalendarMonthIcon/>}
                            <Typography>{translate({section: "SIDEBAR", key: "MENU_RENTALS"})}</Typography>
                        </ListItemButton>
                    </List>
                </Box>
                <Box>
                    <ListItemButton className="sidebar__menu"
                                    onClick={() => navigate(PATHS.HOME)}>
                        {<BuildIcon/>}
                        <Typography>{translate({section: "SIDEBAR", key: "MENU_TOOLS"})}</Typography>
                    </ListItemButton>
                    <List disablePadding>
                        <ListItemButton className="sidebar__sub-menu"
                                        onClick={() => navigate(PATHS.HOME)}>
                            {<CalculateIcon/>}
                            <Typography>{translate({section: "SIDEBAR", key: "MENU_QUITTANCES"})}</Typography>
                        </ListItemButton>
                    </List>
                </Box>
            </List>
        </Stack>
    )
}

export default Sidebar;