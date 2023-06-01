import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import storageService from "../services/storage";
import { setNotification } from "../reducers/notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
  },
});

export const { set, remove } = userSlice.actions;

export const userLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      storageService.saveUser(user);
      dispatch(set(user));
      dispatch(setNotification("welcome!", 5));
    } catch (e) {
      dispatch(setNotification("wrong username or password!", 5, "error"));
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    storageService.removeUser();
    dispatch(set(null));
    dispatch(setNotification("logged out", "", 5));
  };
};

export const userLoad = () => {
  return async (dispatch) => {
    const user = storageService.loadUser();
    dispatch(set(user));
  };
};

export default userSlice.reducer;
