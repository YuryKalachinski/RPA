import About from "../pages/about";
import Login from "../pages/login";
import Users from "../pages/users";
import Main from "../pages/main";
import Substations from "../pages/substations";
import Substation from "../pages/substation";
import Bay from "../pages/bay";
import {
    ABOUT_ROUTE,
    LOGIN_ROUTE,
    USERS_ROUTE,
    MAIN_ROUTE,
    SUBSTATIONS_ROUTE,
    SUBSTATION_ROUTE,
    BAY_ROUTE,
} from "../utils/constants";

export const privateRoutes = [
    { path: ABOUT_ROUTE, Component: About },
    { path: USERS_ROUTE, Component: Users },
    { path: MAIN_ROUTE, Component: Main },
    { path: SUBSTATIONS_ROUTE, Component: Substations },
    { path: SUBSTATION_ROUTE, Component: Substation },
    { path: BAY_ROUTE, Component: Bay },
    // wrong path
    { path: "*", Component: Main },
];

export const publicRoutes = [
    { path: LOGIN_ROUTE, Component: Login },
    // wrong path
    { path: "*", Component: Login },
];
