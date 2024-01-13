import { Outlet } from 'react-router-dom';
import {Box, Stack} from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <Stack sx={{height: "100vh"}}>
            <Navbar/>
            <Stack direction='row' sx={{ flexGrow: 1, overflow: 'hidden'}}>
                <Sidebar sx={{ flexShrink: 0 }} />
                <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <Outlet />
                </Box>
            </Stack>
        </Stack>
    );
};

export default Layout;
