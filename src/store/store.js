import { configureStore } from "@reduxjs/toolkit";
import footerSlice from "./footerSlice";
import dataSlice from "./dataSlice";

const store = configureStore({
  reducer: {
    footer: footerSlice,
    data: dataSlice,
  },
});
export default store;
