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
import { GridContainer } from "../components/GridContainer";
import { WrapperContainer2 } from "../components/WrapperContainers";
import { SubTitle } from "../components/SubTitle";
import { SidebarsOptions } from "../components/SideBarsOptions";

const Wrapper = ({ children }) => {
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
                    <LoadingCard />

                    <GridContainer className="grid-25-175">
                        <SidebarsOptions/>

                        <WrapperContainer2 flexDirection="column">
                            <AppRoutes />
                        </WrapperContainer2>
                    </GridContainer>


                    <ToastContainer />
                </Wrapper>
            </HashRouter>
        </AppProvider>
    );
}

export default App;

