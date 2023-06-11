import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload;
    },
  },
});

export const { set } = usersSlice.actions;

export const initiliazeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(set(users));
  };
};

export default usersSlice.reducer;
