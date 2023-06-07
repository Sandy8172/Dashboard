import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headers: [
    "Index_Num",
    "Selling_Avg_Price",
    "Buying_Avg_Price",
    "Option_Type",
    "Net_Qty",
    "Sell_Qty",
    "Buy_Qty",
    "Exchange_InstrumentID",
    "Exchange_Segment",
    "LTP",
    "Stopl_Loss_Price",
    "Strategy_Name",
    "Strategy_Status",
    "Ticker",
    "Realized",
    "UnRealized",
    "MtM",
  ],
  rows: [],
  MtM: 0,
  mergedRows: [],
  // socketData: [],
};

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    dataHandler(state, action) {
      const data = action.payload;
      state.rows = data.sort;
      state.MtM = data.MtMsum.toFixed(2);
      state.mergedRows = data.mergedRows;
    },

    socketDataHandler(state, action) {
      // const data = action.payload;
      // const exchangeInstrumentID = data.ExchangeInstrumentID;
      // const existingObject = state.socketData.find(
      //   (obj) => obj.ExchangeInstrumentID === exchangeInstrumentID
      // );
      // if (existingObject) {
      //   Object.assign(existingObject, data);
      // } else {
      //   const newData = { ...data }; // Create a new object with the properties from 'data'
      //   state.socketData.push(newData);
      // }
    },
  },
});

export const dataSliceActions = dataSlice.actions;

export default dataSlice.reducer;
