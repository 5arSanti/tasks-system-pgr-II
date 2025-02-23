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
import { LoadingCard } from "../Components/LoadingCard";
import { AppRoutes } from "../Routes";

// Utils
import { scrollToValue } from "../../utils/scrollToValue";
import { GridContainer } from "../Components/GridContainer";
import { WrapperContainer2 } from "../Components/WrapperContainers";
import { SidebarsOptions } from "../Components/SideBarsOptions";

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

