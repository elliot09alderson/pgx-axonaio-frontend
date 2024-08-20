import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import api from "../api/api";

// export const validateToken = async (token) => {
//   const response = await api.get("/user/validate", {
//     method: "GET",
//   });
//   console.log("data.isValid", response?.data?.isValid);

//   return response?.data?.isValid; // Assuming the backend returns { isValid: true/false }
// };

// const token = localStorage.getItem("is_logged_in");
// const isValidToken = await validateToken(token);
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
      redirect("merchants/login");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, changeAppMode } =
  userRedux.actions;
export default userRedux.reducer;
