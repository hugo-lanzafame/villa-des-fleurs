import React from 'react'
import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import {PATH} from '../../constants';
//Route
import Navbar from "./Navbar";
import RoutePrivate from "./RoutePrivate";
import RouteLogin from "./RouteLogin";
//Pages
import LoginPage from '../login/LoginPage';
import HomePage from "../home/HomePage";
import ManagementPage from "../management/ManagementPage";
import TenantCreationPage from '../management/tenant/TenantCreationPage';
import PropertyGestionPage from "../management/property/PropertyGestionPage";
import PropertyListPage from "../management/property/PropertyListPage";
import AccountPage from "../account/AccountPage";

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
                           element={<RoutePrivate><PropertyListPage/></RoutePrivate>}/>
                    <Route path={PATH.PROPERTIES_GESTION}
                           element={<RoutePrivate><PropertyGestionPage/></RoutePrivate>}/>
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
