import List from '@mui/material/List';
import {
    Box,
    ListItemButton, Stack,
} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {useNavigate} from "react-router-dom";
import {PATHS} from '../../constants';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Stack sx={{minWidth: 220, backgroundColor: '#302F37', overflowY: 'auto'}}>
            <List sx={{color: '#FFFFFF', display: {xs: 'none', sm: 'block'}}}>
                <Box>
                    <ListItemButton sx={{gap: '10px'}}
                                    onClick={() => navigate(PATHS.MANAGEMENT)}>
                        {<ContentPasteIcon/>}Gestionnaire
                    </ListItemButton>
                    <List disablePadding>
                        <ListItemButton sx={{pl: 4, gap: "10px"}}
                                        onClick={() => navigate(PATHS.PROPERTIES)}>
                            {<HomeIcon/>} Propriétés
                        </ListItemButton>
                        <ListItemButton sx={{pl: 4, gap: "10px"}}
                                        onClick={() => navigate(PATHS.HOME)}>
                            {<PeopleAltIcon/>} Locataires
                        </ListItemButton>
                        <ListItemButton sx={{pl: 4, gap: "10px"}}
                                        onClick={() => navigate(PATHS.HOME)}>
                            {<CalendarMonthIcon/>} Locations
                        </ListItemButton>
                        <ListItemButton sx={{pl: 4, gap: "10px"}}
                                        onClick={() => navigate(PATHS.HOME)}>
                            {<ShowChartIcon/>} Finances
                        </ListItemButton>
                    </List>
                </Box>
            </List>
        </Stack>
    )
}

export default Sidebar;