import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createMerchant = createAsyncThunk(
  "merchant/createMerchant",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/user/onboarding`, datax, {
        withCredentials: true,
      });

      console.log("data in reseller payin reducer => ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const createMerchantSlice = createSlice({
  name: "createmerchant",
  initialState: {
    merchant: [],
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
      .addCase(createMerchant.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.merchant = payload.merchant;
        state.successMessage = payload.message;
      })
      .addCase(createMerchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(createMerchant.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = createMerchantSlice.actions;
export default createMerchantSlice.reducer;
