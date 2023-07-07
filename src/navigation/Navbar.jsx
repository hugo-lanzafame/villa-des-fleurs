import React from "react";
import {NavLink, Outlet} from "react-router-dom";

/**
 * Component for the navigation bar.
 *
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = () => {
    return (
        <>
            <nav>
                <NavLink to="/" activeClassName="active" exact>Home</NavLink>
                <NavLink to="/management" activeClassName="active">Management</NavLink>
                <NavLink to="/management/building" activeClassName="active">Create building</NavLink>
                <NavLink to="/management/building/creation" activeClassName="active">List building</NavLink>
                <NavLink to="/account" activeClassName="active">List building</NavLink>
            </nav>
            <Outlet/>
        </>
    );
};

export default Navbar;
