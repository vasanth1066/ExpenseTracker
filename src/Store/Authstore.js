import { createSlice } from "@reduxjs/toolkit";

const initialauthState = { token: "", userID: "" };

const AuthSlice = createSlice({
  name: "Auth",
  initialState: initialauthState,
  reducers: {
    Addtoken(state, action) {
      state.token = state.token + action.payload;
    },
    AddUserID(state, action) {
      state.userID = state.userID + action.payload;
    },
  },
});

export const AuthAction = AuthSlice.actions;

export default AuthSlice;
