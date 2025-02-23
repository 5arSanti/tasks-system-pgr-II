import { handleNotifications } from "../handleNotifications";
import { api } from "../api";
import { reloadLocation } from "../realoadLocation";

const handleDeleteData = async (event, endpoint, token, object=[{}]) => {
    event.preventDefault();

    try {
        const url = `${api}${endpoint}`;

        const options = {
            method: 'DELETE', 
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify(object),
        };
      
        const response = await fetch(url, options);
        const data = await response.json();

        if(response.ok) {
            handleNotifications("success", data.message);
            reloadLocation();
        } else {
            throw new Error(data.message);
        }
      
    } catch (err) {
        console.log(err)
        if (Array.isArray(err.message)) {
            err.message.map((error) => handleNotifications('error', error));
        }
        
        handleNotifications('error', err.message);
    }
};

export { handleDeleteData }