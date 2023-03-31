import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
export const userProfileSlice = createSlice({
  name: "profile",
  initialState: {
    isOpen: false,
    user: {},
  },
  reducers: {
    showProfile: (state) => {
      state.isOpen = true;
    },
    hideProfile: (state) => {
      state.isOpen = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },

    reset: (state) => {
      state.isOpen = false;
      state.user = {};
    },
  },
});
