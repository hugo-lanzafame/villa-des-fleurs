import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
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
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    /**
     * Toggles the sidebar visibility on mobile
     */
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    /**
     * Closes the sidebar on mobile
     */
    const closeMobileSidebar = () => {
        setIsMobileSidebarOpen(false);
    };

    return (
        <Stack className="layout">
            <Navbar toggleSidebar={toggleMobileSidebar} />
            <Box className="layout__container-row">
                <Sidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />
                <Box className="layout__container-column">
                    <Box className="layout__container-page">
                        <Outlet />
                    </Box>
                    <Footer />
                </Box>
            </Box>
        </Stack>
    );
};

export default Layout;
