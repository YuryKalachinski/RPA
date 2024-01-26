import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from '../routers';

const AppRouter = () => {
    const { host } = useContext(AuthContext);
    return host ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    path={route.path}
                    Component={route.Component}
                    exact={route.exact}
                    key={route.path}
                />
            ))}
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map((route) => (
                <Route
                    path={route.path}
                    Component={route.Component}
                    exact={route.exact}
                    key={route.path}
                />
            ))}
        </Routes>
    );
};

export default AppRouter;
