import { createSlice } from "@reduxjs/toolkit";

const nofiticationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    create(state, action) {
      return action.payload;
    },
    remove(state) {
      return "";
    },
  },
});

export const { create, remove } = nofiticationSlice.actions;

export const setNotification = (message, time, type) => {
  return async (dispatch) => {
    dispatch(create({ message, type }));
    setTimeout(() => {
      dispatch(remove());
    }, time * 1000);
  };
};

export default nofiticationSlice.reducer;
