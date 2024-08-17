import React from "react";
import {Box, Stack} from "@mui/material";
import {Outlet} from "react-router-dom";
import "../../styles/navigationStyle.scss";
import "../../styles/globalStyle.scss";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

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
