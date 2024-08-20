import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async ({ file }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let url = `/upload`;
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await api.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    loading: false,
    file: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fileUploadSlice.reducer;
