//Dependencies
import React from "react";
import { HashRouter, useLocation } from "react-router-dom";

// CSS
import './App.css';
import "./styles.css";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Context
import { AppContext, AppProvider } from "../../Context";

// Components
import { ToastContainer } from "react-toastify";
import { LoadingCard } from "../components/LoadingCard";
import { AppRoutes } from "../Routes";

// Utils
import { scrollToValue } from "../../utils/scrollToValue";
import { GridContainer } from "../components/GridContainer";
import { WrapperContainer2 } from "../components/WrapperContainers";
import { SidebarsOptions } from "../components/SideBarsOptions";

const Wrapper = ({ children }) => {
    const location = useLocation();
    React.useLayoutEffect(() => {
        scrollToValue();
    }, [location.pathname]);

    return children;
}

const MainWrapper = () => {
    const { auth } = React.useContext(AppContext);

    return (
        <GridContainer className={`${auth ? "grid-025-175" : "grid-1"}`}>
            {auth && <SidebarsOptions />}

            <WrapperContainer2 flexDirection="column">
                <AppRoutes />
            </WrapperContainer2>
        </GridContainer>
    );
}

const App = () => {
    return (
        <AppProvider>
            <HashRouter>
                <Wrapper>
                    <LoadingCard />

                    <MainWrapper />

                    <ToastContainer />
                </Wrapper>
            </HashRouter>
        </AppProvider>
    );
}



export default App;

