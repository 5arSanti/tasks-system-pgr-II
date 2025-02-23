import { Navigate, useRoutes } from "react-router-dom";

import { Home } from "../Screens/Home";
import { LoginScreen } from "../Screens/LoginScreen";
import { RegisterScreen } from "../Screens/RegisterScreen";
import { AppContext } from "../../Context";
import React from "react";
import { TasksScreen } from "../Screens/TasksScreen";

const AppRoutes = () => {
    const { auth } = React.useContext(AppContext);

    let routes = useRoutes([
        { path: "/home", element: <Home /> },
        { path: "/tasks", element: <TasksScreen /> },
        { path: "/*", element: <Navigate replace to={"/home"} /> },

        { path: "/login", element: !auth ? <LoginScreen /> : <Navigate replace to={"/home"} /> },
        { path: "/register", element: <RegisterScreen /> },

    ]);

    return routes;
}

export { AppRoutes };