import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bills: [],
  total: 0,
};

export const billSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.bills = state.bills.concat(action.payload);
      state.total += action.payload.amount;
    },
    editBill: (state, action) => {
      const { id, category, amount, date, description } = action.payload;
      const index = state.bills.findIndex((bill) => bill.id === id);
      if (index !== -1) {
        // Replace the old bill object with the updated one
        state.bills[index] = { id, category, amount, date, description };
        // Recalculate the total by subtracting the old amount and adding the new amount
        state.total = state.total - state.bills[index].amount + amount;
      }
      // console.log(action.payload);
    },
    removeBill: (state, action) => {
      const index = state.bills.findIndex((bill) => bill.id === action.payload);
      state.total -= state.bills[index].amount;
      state.bills.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBill, editBill, removeBill } = billSlice.actions;
