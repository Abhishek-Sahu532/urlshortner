import { configureStore } from "@reduxjs/toolkit";
import UserSlices from "./Slices/UserSlices";
import  UrlSlices from "./Slices/UrlSlices";

export const store = configureStore({
  reducer: {
    user: UserSlices,
    newUrl : UrlSlices
  },
});
