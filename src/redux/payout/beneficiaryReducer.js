import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const get_beneficiary = createAsyncThunk(
  "beneficiarys/get_beneficiary",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/payoutbeneficiary/fetch?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_beneficiary = createAsyncThunk(
  "beneficiarys/delete_beneficiary",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(
        `/payoutbeneficiary/delete/${id}?mode=${mode}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBeneficiary = createAsyncThunk(
  "/createBeneficiary/merchant/payout",
  async ({ datax, mode }, { fulfillWithValue, rejectWithValue }) => {
    console.log(datax);
    try {
      const { data } = await api.post(
        `/payoutbeneficiary/create?mode=${mode}`,
        datax,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const get_reseller_payin_beneficiarys = createAsyncThunk(
//   "beneficiarys/get_reseller_payin_beneficiarys",
//   async ({ page, perPage, search }, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       console.log("fetching started .................");
//       const { data } = await api.get(
//         `/get_reseller_payin_beneficiarys?page=${page}&&search=${search}&&perPage=${perPage}`,
//         {
//           withCredentials: true,
//         }
//       );
//       console.log("fetching ended .................");
//       console.log("data => ", data);
//       // return data;
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const beneficiarySlice = createSlice({
  name: "beneficiary",
  initialState: {
    beneficiaryData: [],
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
      /* -------------------------------------------------------------------------- */
      /*                               get beneficiary                              */
      /* -------------------------------------------------------------------------- */
      .addCase(get_beneficiary.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.beneficiaryData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_beneficiary.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_beneficiary.rejected, (state, { payload }) => {
        state.loader = false;
        state.beneficiaryData = [];
        state.errorMessage = payload?.error;
      })

      /* -------------------------------------------------------------------------- */
      /*                             delete beneficiary                             */
      /* -------------------------------------------------------------------------- */
      .addCase(delete_beneficiary.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.beneficiaryData = state.beneficiaryData.filter(
          (beneficiary) => beneficiary.ben_id !== payload.id
        );
        state.successMessage = payload.message;
      })
      .addCase(delete_beneficiary.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(delete_beneficiary.rejected, (state, { payload }) => {
        state.loader = false;
        state.beneficiaryData = [];

        state.errorMessage = payload.error;
      })

      /* -------------------------------------------------------------------------- */
      /*                             create beneficiaty                             */
      /* -------------------------------------------------------------------------- */
      .addCase(createBeneficiary.fulfilled, (state, { payload }) => {
        // console.log("Merchant Pay in beneficiarys : ", payload);
        state.loader = false;
        state.beneficiaryData = [...state.beneficiaryData, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(createBeneficiary.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(createBeneficiary.rejected, (state, { payload }) => {
        state.loader = false;
        state.beneficiaryData = [];
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = beneficiarySlice.actions;
export default beneficiarySlice.reducer;
