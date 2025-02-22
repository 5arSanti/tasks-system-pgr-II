import { HashRouter } from "react-router-dom";
import { AppProvider } from "../../Context";
import { AppRoutes } from "../Routes";

import "./App.css"

const App = () => {

    return (
        <AppProvider>
            <HashRouter>
                <div className="container">
                    <AppRoutes />
                </div>
            </HashRouter>
        </AppProvider>
    );
}

export default App
