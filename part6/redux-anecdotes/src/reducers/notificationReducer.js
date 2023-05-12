import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    create(state, action) {
      return action.payload;
    },
    remove(state, action) {
      return "";
    },
  },
});

export const { create, remove } = notificationSlice.actions;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(create(content));
    setTimeout(() => {
      dispatch(remove());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
