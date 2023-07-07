import {Navigate} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

/**
 * Component for handling private route redirection.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object.
 * @param {string} props.redirectPath - The path to redirect when user is not logged in.
 * @param {JSX.Element} props.children - The child components.
 * @returns {JSX.Element} The RoutePrivate component.
 */
const RoutePrivate = ({user, redirectPath = '/login', children}) => {
    if (!user) {
        return <Navigate to={redirectPath}/>;
    } else {
        return children;
    }
}
RoutePrivate.propTypes = {
    user: PropTypes.object,
    redirectPath: PropTypes.string,
    children: PropTypes.node,
};


export default RoutePrivate;
