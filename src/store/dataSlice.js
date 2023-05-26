import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headers: [],
  rows: [],
  MtM: 0,
};

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    headersHandler(state, action) {
      state.headers = action.payload;
    },
    rowsHandler(state, action) {
      state.rows = action.payload;
    },
    MtMhandler(state, action) {
      state.MtM = action.payload.toFixed(2);
    },
    // PNLhandler(state, action) {
    //   state.MtM = action.payload;
    // },
  },
});

export const dataSliceActions = dataSlice.actions;

export default dataSlice.reducer;
