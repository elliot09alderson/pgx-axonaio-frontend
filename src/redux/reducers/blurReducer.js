import { createReducer } from "@reduxjs/toolkit";

export const blurReducer = createReducer(
  {
    blur: false,
  },
  {
    BLUR: (state) => {
      state.blur = true;
    },
    UNBLUR: (state) => {
      state.blur = false;
    },
  }
);
