import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {isAuth} from "../firebase/auth";

/**
 * Component for handling login route redirection.
 *
 * @param {Object} props - The component props.
 * @param {string} props.redirectPath - The path to redirect when user is logged in.
 * @param {JSX.Element} props.children - The child components.
 * @returns {JSX.Element} The RouteLogin component.
 */
const RouteLogin = ({redirectPath = '/', children}) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticated = await isAuth();
            setIsUserAuthenticated(isAuthenticated);
        };

        checkAuth().then();
    }, []);

    if (isUserAuthenticated === null) {
        return <div>Loading...</div>;
    } else if (isUserAuthenticated) {
        return <Navigate to={redirectPath}/>;
    } else {
        return children;
    }
}
RouteLogin.propTypes = {
    redirectPath: PropTypes.string,
    children: PropTypes.node,
};


export default RouteLogin;
