import React from "react";
import {NavLink, Outlet} from "react-router-dom";
import {PATH} from '../../constants';

/**
 * Component for the navigation bar.
 *
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = () => {
    return (
        <>
            <nav>
                <NavLink to={PATH.HOME} activeclassname="active">Acceuil</NavLink>
                <NavLink to={PATH.MANAGEMENT} activeclassname="active">Management</NavLink>
                <NavLink to={PATH.PROPERTIES_GESTION} activeclassname="active">Creation de propriétés</NavLink>
                <NavLink to={PATH.PROPERTIES} activeclassname="active">Liste de propriétés</NavLink>
                <NavLink to={PATH.ACCOUNT} activeclassname="active">Compte utilisateur</NavLink>
            </nav>
            <Outlet/>
        </>
    );
};

export default Navbar;
