import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filtering(_, action) {
      return action.payload;
    },
  },
});

export const { filtering } = filterSlice.actions;
export default filterSlice.reducer;
