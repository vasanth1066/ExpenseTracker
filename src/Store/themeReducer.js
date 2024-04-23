import { createSlice } from "@reduxjs/toolkit";

const initialthemeState = {
  theme: {
    isDarkMode: false,
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialthemeState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice;
