import { Navigate, useRoutes } from "react-router-dom";

import { Home } from "../Screens/Home";
import { LoginScreen } from "../Screens/LoginScreen";
import { RegisterScreen } from "../Screens/RegisterScreen";

const AppRoutes = () => {

    let routes = useRoutes([
        {path: "/home", element: <Home/>},
        {path: "/*", element: <Navigate replace to={"/home"}/>},

        {path: "/login", element: <LoginScreen/>},
        {path: "/register", element: <RegisterScreen/>},

    ]);
    
    return routes;
}

export { AppRoutes };