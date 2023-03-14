import { configureStore } from "@reduxjs/toolkit";
import { billSlice } from "./BillSlice";

export const store = configureStore({
  reducer: {
    bills: billSlice.reducer,
  },
});
