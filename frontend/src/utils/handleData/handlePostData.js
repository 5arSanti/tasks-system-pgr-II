import { api } from "../api";
import { handleNotifications } from "../handleNotifications";
import { reloadLocation } from "../realoadLocation";


const handlePostData = async (event, object, endpoint, token) => {
    event.preventDefault();

    try {
        const url = `${api}${endpoint}`;

        const options = {
            method: 'POST', 
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token ? `Bearer ${token}` : null,
            },
            body: JSON.stringify(object),
        };
      
        const response = await fetch(url, options);
        const data = await response.json();

        if(response.ok) {
            handleNotifications("success", data.message);
            return data;
        } else {
            throw new Error(data.message);
        }
      
    } catch (err) {
        if (Array.isArray(err.message)) {
            err.message.map((error) => handleNotifications('error', error));
        }
        
        handleNotifications('error', err.message);
    }
};



const handlePostFile = async (event, object, endpoint, callback = reloadLocation) => {
    event.preventDefault();

    try {
        const url = `${api}${endpoint}`;

        const options = {
            method: 'POST', 
            mode:'cors',

            body: object
        };
      
        const response = await fetch(url, options);
        const data = await response.json();

        if(data.Status === "Success") {
            handleNotifications("success", data.message);
            
            callback(data);
        } else {
            handleNotifications("error", data.Error)
        }
      
    } catch (err) {
        handleNotifications('error', err);
    }
};

export { handlePostData, handlePostFile };
