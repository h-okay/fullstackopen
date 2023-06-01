import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/users";

const statSlice = createSlice({
  name: "stats",
  initialState: {},
  reducers: {
    set(state, action) {
      return action.payload;
    },
    increment(state, action) {
      state[action.payload.name] += 1;
    },
    decrement(state, action) {
      state[action.payload.name] -= 1;
    },
  },
});

export const { set, increment, decrement } = statSlice.actions;

export const initializeStats = () => {
  return async (dispatch) => {
    const users = await userService.getAll();

    const initialStats = {};
    users.forEach((user) => {
      initialStats[user.name] = user.blogs.length;
    });

    dispatch(set(initialStats));
  };
};

export const incrementStat = (user) => {
  return async (dispatch) => {
    dispatch(increment(user));
  };
};

export const decrementStat = (user) => {
  return async (dispatch) => {
    dispatch(decrement(user));
  };
};

export default statSlice.reducer;
