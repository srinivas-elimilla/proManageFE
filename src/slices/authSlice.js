import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      console.log(state, action);

      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      // for now using localStorage.removeItem("token")
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
