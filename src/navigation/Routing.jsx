import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import {isAuth} from "../firebase/auth";
//Route
import Navbar from "./Navbar";
import RoutePrivate from "./RoutePrivate";
import RouteLogin from "./RouteLogin";
//Pages
import LoginPage from '../pages/login/LoginPage';
import HomePage from "../pages/home/HomePage";
import ManagementPage from "../pages/management/ManagementPage";
import TenantCreationPage from '../pages/management/tenant/TenantCreationPage';
import BuildingCreationPage from "../pages/management/building/BuildingCreationPage";
import BuildingListPage from "../pages/management/building/BuildingListPage";
import AccountPage from "../pages/account/AccountPage";

/**
 * Component for handling the application routing.
 *
 * @returns {JSX.Element} The Routing component.
 */
const Routing = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        return () => isAuth(setUser);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login"
                       element={<RouteLogin user={user}><LoginPage/></RouteLogin>}
                />
                <Route path="/"
                       element={<RoutePrivate user={user}><Navbar/></RoutePrivate>}>
                    <Route path="/"
                           element={<RoutePrivate user={user}><HomePage/></RoutePrivate>}
                    />
                    <Route path="/management"
                           element={<RoutePrivate user={user}><ManagementPage/></RoutePrivate>}
                    />
                    <Route path="/management/building"
                           element={<RoutePrivate user={user}><BuildingListPage/></RoutePrivate>}
                    />
                    <Route path="/management/building/creation"
                           element={<RoutePrivate user={user}><BuildingCreationPage/></RoutePrivate>}
                    />
                    <Route path="/management/tenant/creation"
                           element={<RoutePrivate user={user}><TenantCreationPage/></RoutePrivate>}
                    />
                    <Route path="/account"
                           element={<RoutePrivate user={user}><AccountPage/></RoutePrivate>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
