import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Authstore";
import ExpenseSlice from "./ExpenseStore";
import themeSlice from "./themeReducer";

const Store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    expense: ExpenseSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default Store;
