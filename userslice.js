import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: localStorage.getItem("username") || null,
    validToken: localStorage.getItem("token") || null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload.username;
      state.validToken = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
    },
    loginFail: (state, action) => {
      state.error = action.payload;
    },

    logout: (state) => {
      state.validToken = null;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },

    signupSuccess: (state, action) => {
      state.username = action.payload.username;
      state.validToken = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    signupFail: (state, action) => {
      state.error = action.payload;
    },

    
  },
});
export const { loginSuccess, loginFail, signupSuccess, signupFail, logout } =
  userSlice.actions;
export default userSlice.reducer;
