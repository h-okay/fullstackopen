import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";
import statReducer from "./reducers/statReducer";
import commentReducer from "./reducers/commentReducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    stats: statReducer,
    user: userReducer,
    blogs: blogReducer,
    comments: commentReducer,
    notification: notificationReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
