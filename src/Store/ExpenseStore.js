import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { data: [] };

const ExpenseSlice = createSlice({
  name: "Total Expense",
  initialState: initialExpenseState,
  reducers: {
    AddExpense(state, action) {
      state.data.push(action.payload);
    },
  },
});

export const ExpenseAction = ExpenseSlice.actions;

export default ExpenseSlice;
