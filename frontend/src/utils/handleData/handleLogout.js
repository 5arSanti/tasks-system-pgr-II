import { clearToken } from "../clearToken";
import { handleNotifications } from "../handleNotifications";
import { reloadLocation } from "../realoadLocation";

const handleLogout = () => {
    clearToken();
    handleNotifications("success", "Sesión cerrada correctamente");
    reloadLocation()
}

export { handleLogout };