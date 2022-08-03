import { createSlice } from "@reduxjs/toolkit";

const themeMode = localStorage.getItem("themeMode");
const lang = localStorage.getItem("lang");

const initialState = {
  themeMode: themeMode ? themeMode : "light",
  lang: lang ? lang : "en",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.themeMode = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setTheme, setLang } = themeSlice.actions;
export default themeSlice.reducer;
