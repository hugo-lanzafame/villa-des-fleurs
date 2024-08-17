import React from 'react'
import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import {PATHS} from '../../constants/routing';
import AccountPage from "../account/AccountPage";
import HomePage from "../home/HomePage";
import Layout from "../navigation/Layout";
import LoginPage from '../login/LoginPage';
import ManagementPage from "../management/ManagementPage";
import UnknownPage from "../unknown/UnknownPage";
import PropertyAddUpdatePage from "../property/PropertyAddUpdatePage";
import PropertyListPage from "../property/PropertyListPage";
import RoutePrivate from "./RoutePrivate";
import RouteLogin from "./RouteLogin";
import TenantAddUpdatePage from '../tenant/TenantAddUpdatePage';
import TenantListPage from "../tenant/TenantListPage";
import {TableProvider} from "../../contexts/TableProvider";
import RentalListPage from "../rental/RentalListPage";
import RentalAddUpdatePage from "../rental/RentalAddUpdatePage";

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
                       element={
                           <RouteLogin>
                               <LoginPage/>
                           </RouteLogin>
                       }/>
                <Route path={PATHS.HOME}
                       element={
                           <RoutePrivate>
                               <Layout/>
                           </RoutePrivate>
                       }>
                    <Route path={PATHS.HOME}
                           element={
                               <RoutePrivate>
                                   <HomePage/>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.MANAGEMENT}
                           element={
                               <RoutePrivate>
                                   <ManagementPage/>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.PROPERTIES}
                           element={
                               <RoutePrivate>
                                   <TableProvider>
                                       <PropertyListPage/>
                                   </TableProvider>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.PROPERTIES_CREATION}
                           element={
                               <RoutePrivate>
                                   <PropertyAddUpdatePage/>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.PROPERTIES_EDITION}
                           element={
                               <RoutePrivate>
                                   <PropertyAddUpdatePage/>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.TENANTS}
                           element={
                               <RoutePrivate>
                                   <TableProvider>
                                       <TenantListPage/>
                                   </TableProvider>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.TENANTS_CREATION}
                           element={
                               <RoutePrivate>
                                   <TenantAddUpdatePage/>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.TENANTS_EDITION}
                           element={
                               <RoutePrivate>
                                   <TenantAddUpdatePage/>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.RENTALS}
                           element={
                               <RoutePrivate>
                                   <TableProvider>
                                       <RentalListPage/>
                                   </TableProvider>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.RENTALS_CREATION}
                           element={
                               <RoutePrivate>
                                   <RentalAddUpdatePage/>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.RENTALS_EDITION}
                           element={
                               <RoutePrivate>
                                   <RentalAddUpdatePage/>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.ACCOUNT}
                           element={
                               <RoutePrivate>
                                   <AccountPage/>
                               </RoutePrivate>
                           }/>
                    <Route path={PATHS.UNKNOWN}
                           element={
                               <RoutePrivate>
                                   <UnknownPage/>
                               </RoutePrivate>
                           }/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
