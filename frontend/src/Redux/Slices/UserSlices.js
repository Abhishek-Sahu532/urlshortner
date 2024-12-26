import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  error: null,
  loading: false,
  success: false,
  message: "",
};

export const UserSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    getLoggedUserDetailsRequest: (state) => {
      state.loading = true;
    },
    getLoggedUserDetailsRequestSuccess: (state, action) => {
      state.currentUser = {};
      state.loading = false;
      state.success = action.payload.success;
    },
    getLoggedUserDetailsRequestFailure: (state, action) => {
      state.currentUser = {};
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  getLoggedUserDetailsRequest,
  getLoggedUserDetailsRequestSuccess,
  getLoggedUserDetailsRequestFailure,
} = UserSlices.actions;

export default UserSlices.reducer;
