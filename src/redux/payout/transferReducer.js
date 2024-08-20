import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const get_transfer = createAsyncThunk(
  "transfers/get_transfer",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/payouttransfer/fetch?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_transfer_by_date = createAsyncThunk(
  "transfers/get_transfer_by_date",
  async ({ mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/payouttransfer/fetchbydate?mode=${mode}`;
      const { data } = await api.get(url, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_transfer = createAsyncThunk(
  "transfers/fetch_datewise_transfer",
  async ({ id, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(
        `/payintransfer/delete/${id}?mode=${mode}`,
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

export const createtransfer = createAsyncThunk(
  "/createtransfer/merchant/payout",
  async ({ datax, mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/payouttransfer/create?mode=${mode}`,
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

// export const get_reseller_payin_transfers = createAsyncThunk(
//   "transfers/get_reseller_payin_transfers",
//   async ({ page, perPage, search }, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       console.log("fetching started .................");
//       const { data } = await api.get(
//         `/get_reseller_payin_transfers?page=${page}&&search=${search}&&perPage=${perPage}`,
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

const transferSlice = createSlice({
  name: "transfer",
  initialState: {
    transferData: [],
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
      /*                               get transfer                              */
      /* -------------------------------------------------------------------------- */
      .addCase(get_transfer.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";

        state.transferData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_transfer.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_transfer.rejected, (state, { payload }) => {
        state.transferData = [];

        state.loader = false;

        state.errorMessage = payload?.error;
      })

      /* -------------------------------------------------------------------------- */
      /*                              payout transfer                              */
      /* -------------------------------------------------------------------------- */
      .addCase(get_transfer_by_date.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.transferData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(get_transfer_by_date.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_transfer_by_date.rejected, (state, { payload }) => {
        state.loader = false;
        state.transferData = [];

        state.errorMessage = payload?.error;
      })

      /* -------------------------------------------------------------------------- */
      /*                             delete transfer                             */
      /* -------------------------------------------------------------------------- */
      .addCase(delete_transfer.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "";
        state.transferData = state.transferData.filter(
          (transfer) => transfer.m_id !== payload.id
        );
        state.successMessage = payload.message;
      })
      .addCase(delete_transfer.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(delete_transfer.rejected, (state, { payload }) => {
        state.loader = false;

        state.errorMessage = payload.error;
      })

      /* -------------------------------------------------------------------------- */
      /*                             create beneficiaty                             */
      /* -------------------------------------------------------------------------- */
      .addCase(createtransfer.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.transferData = [...state.transferData, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(createtransfer.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(createtransfer.rejected, (state, { payload }) => {
        state.loader = false;
        state.transferData = [];
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = transferSlice.actions;
export default transferSlice.reducer;
