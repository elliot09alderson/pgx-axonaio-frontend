import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const userRedux = createSlice({
  name: "user",
  initialState: {
    isFetching: false,
    mode: null,
    error: false,
    currentUser: null,
    
    isLogin: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      // console.log(action.payload);
      state.currentUser = action.payload;
      state.error = false;
      state.isLogin = true;
      state.mode = action.payload.app_mode;
      redirect("/merchants/apps");
    },
    changeAppMode: (state, action) => {
      state.mode =
        state.mode === "live" ? "test" : state.mode === "test" ? "live" : null;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = false;
      state.isLogin = false;
      localStorage.removeItem("is_logged_in");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, changeAppMode } =
  userRedux.actions;
export default userRedux.reducer;
