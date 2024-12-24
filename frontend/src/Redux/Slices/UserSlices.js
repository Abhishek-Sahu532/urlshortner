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
    registerUserRequest: (state) => {
      state.loading = true;
    },
    registerUserSuccess: (state, action) => {
      state.currentUser = {};
      state.loading = false;
      state.success = action.payload.success;
    },
    registerUserFailure: (state, action) => {
      state.currentUser = {};
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const { registerUserRequest } = UserSlices.actions;

export default UserSlices.reducer;
