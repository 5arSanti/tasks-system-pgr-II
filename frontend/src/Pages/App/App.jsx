import { HashRouter } from "react-router-dom";
import { AppProvider } from "../../Context";
import { AppRoutes } from "../Routes";

import "./App.css"

const App = () => {

    return (
        <AppProvider>
            <HashRouter>

                <AppRoutes />
            </HashRouter>
        </AppProvider>
    );
}

export default App
