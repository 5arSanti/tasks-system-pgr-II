import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { handleNotifications } from "../handleNotifications";
import { clearToken } from "../clearToken";


axios.defaults.withCredentials = true;

const handleAuthRequest = (context, navigate) => {
    const { setUser, setAuth } = context;

    const token = localStorage.getItem("access_token");

    if (!token) { return navigate("/login"); }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            clearToken();
            setAuth(false);
            navigate("/login");
            return;
        }

        setAuth(true);
        setUser(decoded.user);

    } catch (err) {
        setAuth(false);
        clearToken();
        handleNotifications("error", "Sesión expirada o inválida.");
        navigate("/login");
    }
};
export { handleAuthRequest };