import {Outlet} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import "./navigationStyle.scss";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Layout component that represents the overall structure of the application.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the Layout.
 */
const Layout = () => {
    return (
        <Stack className="layout">
            <Navbar/>
            <Box className="layout__container-row">
                <Sidebar/>
                <Box className="layout__container-column">
                    <Box className="layout__container-page">
                        <Outlet/>
                    </Box>
                    <Footer/>
                </Box>
            </Box>
        </Stack>
    );
};

export default Layout;
