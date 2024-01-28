import About from '../pages/About';
import Login from '../pages/Login';
import Users from '../pages/Users';
import Main from '../pages/Main';
import Substations from '../pages/Substations';
import Substation from '../pages/Substation';
import {
    ABOUT_ROUTE,
    LOGIN_ROUTE,
    USERS_ROUTE,
    MAIN_ROUTE,
    SUBSTATIONS_ROUTE,
    SUBSTATION_ROUTE,
    BAY_ROUTE,
} from '../utils/constants';
import Bay from '../pages/Bay';

export const privateRoutes = [
    { path: ABOUT_ROUTE, Component: About, exact: true },
    { path: USERS_ROUTE, Component: Users, exact: true },
    { path: MAIN_ROUTE, Component: Main, exact: true },
    { path: SUBSTATIONS_ROUTE, Component: Substations, exact: true },
    { path: SUBSTATION_ROUTE, Component: Substation, exact: true },
    { path: BAY_ROUTE, Component: Bay, exact: true },
    // wrong path
    { path: '*', Component: Main, exact: true },
];

export const publicRoutes = [
    { path: LOGIN_ROUTE, Component: Login, exact: true },
    // wrong path
    { path: '*', Component: Login, exact: true },
];
