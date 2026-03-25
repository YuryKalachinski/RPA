import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import { privateRoutes, publicRoutes } from "./routers";

const AppRouter = () => {
    const { currentUser } = useAuth();

    return (
        <Routes>
            {currentUser
                ? privateRoutes.map((route) => (
                      <Route
                          path={route.path}
                          Component={route.Component}
                          key={route.path}
                      />
                  ))
                : publicRoutes.map((route) => (
                      <Route
                          path={route.path}
                          Component={route.Component}
                          key={route.path}
                      />
                  ))}
        </Routes>
    );
};

export default AppRouter;
