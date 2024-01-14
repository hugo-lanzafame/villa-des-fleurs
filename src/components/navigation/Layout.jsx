import {Outlet} from "react-router-dom";
import {Stack} from "@mui/material";
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
            <Stack className="layout__container-row">
                <Sidebar/>
                <Stack className="layout__container-column">
                    <Outlet/>
                    <Footer/>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Layout;
