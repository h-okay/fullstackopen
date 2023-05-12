import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, notifDispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[notification, notifDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationDispatch = useContext(NotificationContext);
  return notificationDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationDispatch = useContext(NotificationContext);
  return notificationDispatch[1];
};

export default NotificationContext;
