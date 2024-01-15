import React from 'react'
import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import {PATHS} from '../../constants';
//Route
import RoutePrivate from "./RoutePrivate";
import RouteLogin from "./RouteLogin";
//Pages
import LoginPage from '../login/LoginPage';
import HomePage from "../home/HomePage";
import ManagementPage from "../management/ManagementPage";
import TenantCreationPage from '../management/tenant/TenantCreationPage';
import PropertyAddUpdatePage from "../management/property/PropertyAddUpdatePage";
import PropertyListPage from "../management/property/PropertyListPage";
import AccountPage from "../account/AccountPage";
import Layout from "../navigation/Layout";
import NotFoundPage from "../notfound/NotFoundPage";

/**
 * Component for handling the application routing.
 *
 * @returns {JSX.Element} The Routing component.
 */
const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PATHS.LOGIN}
                       element={<RouteLogin><LoginPage/></RouteLogin>}/>
                <Route path={PATHS.HOME}
                       element={<RoutePrivate><Layout/></RoutePrivate>}>
                    <Route path={PATHS.HOME}
                           element={<RoutePrivate><HomePage/></RoutePrivate>}/>
                    <Route path={PATHS.MANAGEMENT}
                           element={<RoutePrivate><ManagementPage/></RoutePrivate>}/>
                    <Route path={PATHS.PROPERTIES}
                           element={<RoutePrivate><PropertyListPage/></RoutePrivate>}/>
                    <Route path={PATHS.PROPERTIES_GESTION}
                           element={<RoutePrivate><PropertyAddUpdatePage/></RoutePrivate>}/>
                    <Route path={PATHS.TENANTS_GESTION}
                           element={<RoutePrivate><TenantCreationPage/></RoutePrivate>}/>
                    <Route path={PATHS.ACCOUNT}
                           element={<RoutePrivate><AccountPage/></RoutePrivate>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
