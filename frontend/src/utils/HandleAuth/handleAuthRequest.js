import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { handleNotifications } from "../handleNotifications";


axios.defaults.withCredentials = true;

const handleAuthRequest = (context, navigate) => {
    const { setUser, setAuth } = context;

    const token = localStorage.getItem("access_token");

    if (!token) { return navigate("/register"); }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            setAuth(false);
            navigate("/register");
            return;
        }

        setAuth(true);
        setUser(decoded.user);

    } catch (err) {
        setAuth(false);
        localStorage.removeItem("token");
        handleNotifications("error", "Sesión expirada o inválida.");
        navigate("/register");
    }
};
export { handleAuthRequest };