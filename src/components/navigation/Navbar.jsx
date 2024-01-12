import React from "react";
import {NavLink, Outlet} from "react-router-dom";
import {PATHS} from '../../constants';

/**
 * Component for the navigation bar.
 *
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = () => {
    return (
        <>
            <nav>
                <NavLink to={PATHS.HOME} activeclassname="active">Acceuil</NavLink>
                <NavLink to={PATHS.MANAGEMENT} activeclassname="active">Management</NavLink>
                <NavLink to={PATHS.PROPERTIES_GESTION} activeclassname="active">Creation de propriétés</NavLink>
                <NavLink to={PATHS.PROPERTIES} activeclassname="active">Liste de propriétés</NavLink>
                <NavLink to={PATHS.ACCOUNT} activeclassname="active">Compte utilisateur</NavLink>
            </nav>
            <Outlet/>
        </>
    );
};

export default Navbar;
