import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    task: null,
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

export const { setCredentials, logout } = taskSlice.actions;

export default taskSlice.reducer;
