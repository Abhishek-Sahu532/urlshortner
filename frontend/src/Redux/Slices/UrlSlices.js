import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
  success: false,
  message: "",
  url: {},
};

export const UrlSlices = createSlice({
  name: "newUrl",
  initialState,
  reducers: {
    registerUrlRequest: (state) => {
      state.loading = true;
    },
    registerUrlSuccess: (state, action) => {
      state.url = action.payload.url;
      state.loading = false;
      state.success = action.payload.success;
    },
    registerUrlFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const { registerUrlRequest, registerUrlSuccess, registerUrlFailure } =
  UrlSlices.actions;

export default UrlSlices.reducer;
