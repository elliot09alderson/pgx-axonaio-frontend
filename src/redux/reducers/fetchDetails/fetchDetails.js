import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api";

export const fetchProfileDetails = createAsyncThunk(
  "user/fetchProfileDetails",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/profile`, {
        withCredentials: true,
      });

      console.log("data in profile => ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fetchDetails = createSlice({
  name: "details",
  initialState: {
    profileDetails: {},
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
    builder
      .addCase(fetchProfileDetails.fulfilled, (state, { payload }) => {
        console.log(payload.data);
        state.loader = false;
        state.profileDetails = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchProfileDetails.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchProfileDetails.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = fetchDetails.actions;
export default fetchDetails.reducer;
