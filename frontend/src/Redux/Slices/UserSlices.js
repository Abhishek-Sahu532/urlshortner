import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  error: null,
  loading: false,
  success: false,
  logoutSuccess: false,
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
      state.currentUser = action.payload.user;
      state.loading = false;
      state.success = action.payload.success;
    },
    getLoggedUserDetailsRequestFailure: (state, action) => {
      state.currentUser = {};
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    logOutRequest: (state) => {
      state.loading = true;
    },
    logOutSuccess: (state, action) => {
      state.currentUser = {};
      state.loading = false;
      state.success = false;
      state.logoutSuccess = action.payload.success;
    },
    logOutFailure: (state, action) => {
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
  logOutRequest,
  logOutSuccess,
  logOutFailure,
} = UserSlices.actions;

export default UserSlices.reducer;
