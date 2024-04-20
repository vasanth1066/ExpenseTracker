import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Authstore";
import ExpenseSlice from "./ExpenseStore";

const Store = configureStore({
  reducer: { auth: AuthSlice.reducer, expense: ExpenseSlice.reducer },
});

export default Store;
