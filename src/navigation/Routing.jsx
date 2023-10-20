import React from 'react'
import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import {PATH} from '../constants';
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
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PATH.LOGIN}
                       element={<RouteLogin><LoginPage/></RouteLogin>}/>
                <Route path={PATH.HOME}
                       element={<RoutePrivate><Navbar/></RoutePrivate>}>
                    <Route path={PATH.HOME}
                           element={<RoutePrivate><HomePage/></RoutePrivate>}/>
                    <Route path={PATH.MANAGEMENT}
                           element={<RoutePrivate><ManagementPage/></RoutePrivate>}/>
                    <Route path={PATH.PROPERTIES}
                           element={<RoutePrivate><BuildingListPage/></RoutePrivate>}/>
                    <Route path={PATH.PROPERTIES_GESTION}
                           element={<RoutePrivate><BuildingCreationPage/></RoutePrivate>}/>
                    <Route path={PATH.TENANTS_GESTION}
                           element={<RoutePrivate><TenantCreationPage/></RoutePrivate>}/>
                    <Route path={PATH.ACCOUNT}
                           element={<RoutePrivate><AccountPage/></RoutePrivate>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
