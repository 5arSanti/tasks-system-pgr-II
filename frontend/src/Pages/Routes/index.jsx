import React from "react";
import { AppContext } from "../../Context";
import { Navigate, useRoutes } from "react-router-dom";

import { Home } from "../Screens/Home";
import { RegisterScreen } from "../Screens/RegisterScreen";
import { LoginScreen } from "../Screens/LoginScreen";

const AppRoutes = () => {

    const context = React.useContext(AppContext);
    const { auth } = context;

    let routes = useRoutes([
        {path: "/home", element: <Home/>},
        {path: "/*", element: <Navigate replace to={"/home"}/>},
        
        {path: "/register", element: <RegisterScreen/>},

        {path: "/login", element: !auth ? <LoginScreen/> : <Navigate replace to={"/home"}/>},
    ]);
    
    return routes;
}

export { AppRoutes };