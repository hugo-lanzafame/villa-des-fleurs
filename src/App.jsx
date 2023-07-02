import React, {useEffect, useState} from 'react'
import {BrowserRouter, Navigate, NavLink, Outlet, Route, Routes,} from 'react-router-dom'
import {auth, onAuthStateChanged} from "./firebase/auth";
//Pages
import LoginPage from './pages/login/LoginPage';
import HomePage from "./pages/home/HomePage";
import ManagementPage from "./pages/management/ManagementPage";
import TenantCreationPage from './pages/management/tenant/TenantCreationPage';
import BuildingCreationPage from "./pages/management/building/BuildingCreationPage";
import BuildingListPage from "./pages/management/building/BuildingListPage";
import AccountPage from "./pages/account/AccountPage";

const Navbar = () => {
    return (
        <>
        <nav>
            <NavLink to="/" activeClassName="active" exact>Home</NavLink>
            <NavLink to="/management" activeClassName="active">Management</NavLink>
            <NavLink to="/management/building" activeClassName="active">Create building</NavLink>
            <NavLink to="/management/building/creation" activeClassName="active">List building</NavLink>
            <NavLink to="/account" activeClassName="active">List building</NavLink>
        </nav>
        <Outlet/>
        </>
    );
};

const PrivateRoute = ({user, redirectPath = '/login', children}) => {
    if (!user) {
        return <Navigate to={redirectPath}/>;
    } else {
        return children;
    }
}

const LoginRoute = ({user, redirectPath = '/', children}) => {
    if (user) {
        return <Navigate to={redirectPath}/>;
    } else {
        return children;
    }
}

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login"
                       element={<LoginRoute user={user}><LoginPage/></LoginRoute>}
                />
                <Route path="/"
                       element={<PrivateRoute user={user}><Navbar/></PrivateRoute>}>
                    <Route path="/"
                           element={<PrivateRoute user={user}><HomePage/></PrivateRoute>}
                    />
                    <Route path="/management"
                           element={<PrivateRoute user={user}><ManagementPage/></PrivateRoute>}
                    />
                    <Route path="/management/building"
                           element={<PrivateRoute user={user}><BuildingListPage/></PrivateRoute>}
                    />
                    <Route path="/management/building/creation"
                           element={<PrivateRoute user={user}><BuildingCreationPage/></PrivateRoute>}
                    />
                    <Route path="/management/tenant/creation"
                           element={<PrivateRoute user={user}><TenantCreationPage/></PrivateRoute>}
                    />
                    <Route path="/account"
                           element={<PrivateRoute user={user}><AccountPage/></PrivateRoute>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App