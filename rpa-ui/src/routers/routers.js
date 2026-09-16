import {
    Templates,
    Bay,
    Login,
    Main,
    Substation,
    Substations,
    Users,
} from "../pages";
import {
    TEMPLATES_ROUTE,
    LOGIN_ROUTE,
    USERS_ROUTE,
    MAIN_ROUTE,
    SUBSTATIONS_ROUTE,
    SUBSTATION_ROUTE,
    BAY_ROUTE,
} from "../utils/constants";

export const privateRoutes = [
    { path: TEMPLATES_ROUTE, Component: Templates },
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
