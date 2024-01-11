import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

const useNotificationContext = () => useContext(NotificationContext);

const NotificationProvider = ({children}) => {
    const [notifications, setNotifications] = useState([]);

    const updateNotifications = (newNotifications) =>{
        console.log('Updating notifications:', newNotifications);
        setNotifications(newNotifications)
    }
    
    return (
        <NotificationContext.Provider value={{ notifications, updateNotifications }}>
          {children}
        </NotificationContext.Provider>
    );
}
export{
    useNotificationContext,
    NotificationProvider,
} 