import { createSlice } from "@reduxjs/toolkit";

import verifyToken from "utils/verifyToken";

// const token = localStorage.getItem("token");
// const isAuthenticated = verifyToken(token);

const initialState = {
  user: "",
  // loading: false,
  // error: "",
  // success: false,
  token: "",
  isAuthenticated: false,
  // isTokenExpired: isAuthenticated ? false : true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, payload) => {
      state.user = payload.employee;
      state.token = payload.token;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.token = "";
      state.isTokenExpired = true;
      state.isAuthenticated = false;
    },
  },
});

export const { signOut, setUser } = userSlice.actions;
export default userSlice.reducer;
