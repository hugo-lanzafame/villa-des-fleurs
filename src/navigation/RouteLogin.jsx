import React from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Component for handling login route redirection.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object.
 * @param {string} props.redirectPath - The path to redirect when user is logged in.
 * @param {JSX.Element} props.children - The child components.
 * @returns {JSX.Element} The RouteLogin component.
 */
const RouteLogin = ({user, redirectPath = '/', children}) => {
    if (user) {
        return <Navigate to={redirectPath}/>;
    } else {
        return children;
    }
}
RouteLogin.propTypes = {
    user: PropTypes.object,
    redirectPath: PropTypes.string,
    children: PropTypes.node,
};


export default RouteLogin;
