import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchApps = createAsyncThunk(
  "admin/fetchApps",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/fetch_apps`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "apps",
  initialState: {
    apps: [],
    error: null,
    loader: false,
    successMessage: "",
    errorMessage: "",
  },

  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    /* ----------------- //______Assign app for  merchant ______ ---------------- */
    builder
      .addCase(fetchApps.fulfilled, (state, { payload }) => {
        state.loader = false;

        state.apps = payload.data;
        state.successMessage = "Apps fetched successfully";
      })
      .addCase(fetchApps.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchApps.rejected, (state, { payload }) => {
        state.loader = false;

        state.errorMessage = "check your internet connection";
      });
  },
});

export default authSlice.reducer;
