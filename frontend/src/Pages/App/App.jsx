//Dependencies
import React from "react";
import { HashRouter, useLocation } from "react-router-dom";

// CSS
import './App.css';
import "./styles.css";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Context
import { AppProvider } from "../../Context";

// Components
import { ToastContainer } from "react-toastify";
import { LoadingCard } from "../components/LoadingCard";
import { AppRoutes } from "../Routes";

// Utils
import { scrollToValue } from "../../utils/scrollToValue";

const Wrapper = ({children}) => {
    const location = useLocation();
    React.useLayoutEffect(() => {
        scrollToValue();
    }, [location.pathname]);

    return children;
}

const App = () => {
    return (
        <AppProvider>
            <HashRouter>
                <Wrapper>                    
                    <LoadingCard/>

                    <AppRoutes/>

                    <ToastContainer/>
                </Wrapper>
            </HashRouter>
        </AppProvider>
    );
}

export default App;

