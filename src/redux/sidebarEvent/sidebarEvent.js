import { createSlice } from "@reduxjs/toolkit";
const sidebarEvent = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false, // global state
  },
  reducers: {
    toggleSidebar: (state, payload) => {
      state.isOpen =
        payload === "open" ? true : payload === "close" ? false : !state.isOpen;
    },
  },
});

export const { toggleSidebar } = sidebarEvent.actions;
export default sidebarEvent.reducer;
