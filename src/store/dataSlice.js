import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: {
    select: "",
    symbol: "",
    Qty: "",
    order: "",
  },
  isDisabled:false
};
const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    selectedValueHandler(state, action) {
      const value = action.payload;
      state.selected.select = value;
      if (state.selected.select === "Strategy") {
        state.isDisabled = true;
        state.selected.symbol = "";
      } else {
        state.isDisabled = false;
      }
    },
    symbolValueHandler(state, action) {
      const value = action.payload;
      state.selected.symbol = value;
    },
    QtyValueHandler(state, action) {
      const value = action.payload;
      state.selected.Qty = value;
    },
    orderValueHandler(state, action) {
      const value = action.payload;
      state.selected.order = value;
    },
  },
});

export const dataSliceActions = dataSlice.actions;

export default dataSlice.reducer;
