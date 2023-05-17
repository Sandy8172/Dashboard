import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indexValue: [],
  selected: {
    select: "",
    symbol: "",
    Qty: "",
    order: "",
    option: "",
  },
  isDisabled: false,
  isChecked: undefined,
};
const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    toggleIndex(state, action) {
      const indexNum = action.payload;
      if (state.indexValue.includes(indexNum)) {
        state.indexValue = state.indexValue.filter(
          (index) => index !== indexNum
        );
      } else {
        state.indexValue = [...state.indexValue, indexNum];
      }
      if (state.indexValue.length > 0) {
        state.isChecked = true;
        state.isDisabled = true;
        state.selected.select = "STRATEGY";
      } else {
        state.isChecked = false;
        state.isDisabled = false;
        state.selected.select = "";
      }
    },
    resetForm: (state) => {
      Object.assign(state, initialState);
    }, 
    selectedValueHandler(state, action) {
      const value = action.payload;
      state.selected.select = value;
      if (state.selected.select === "STRATEGY") {
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
    optionValueHandler(state, action) {
      const value = action.payload;
      state.selected.option = value;
    },
  },
});

export const dataSliceActions = dataSlice.actions;

export default dataSlice.reducer;
