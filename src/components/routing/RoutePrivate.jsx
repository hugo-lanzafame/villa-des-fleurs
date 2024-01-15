import {Navigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {isAuth} from "../../services/api/firebase/auth";

/**
 * Component for handling private route redirection.
 *
 * @param {Object} props - The component props.
 * @param {string} props.redirectPath - The path to redirect when user is not logged in.
 * @param {JSX.Element} props.children - The child components.
 * @returns {JSX.Element} The RoutePrivate component.
 */
const RoutePrivate = ({redirectPath = '/login', children}) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticated = await isAuth();
            setIsUserAuthenticated(isAuthenticated);
        };

        checkAuth();
    }, []);

    if (isUserAuthenticated === null) {
        return <div>Loading...</div>;
    } else if (!isUserAuthenticated) {
        return <Navigate to={redirectPath}/>;
    } else {
        return children;
    }
}
RoutePrivate.propTypes = {
    redirectPath: PropTypes.string,
    children: PropTypes.node,
};


export default RoutePrivate;
