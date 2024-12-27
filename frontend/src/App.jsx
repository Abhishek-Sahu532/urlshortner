import { Outlet } from "react-router";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import {
  getLoggedUserDetailsRequest,
  getLoggedUserDetailsRequestSuccess,
  getLoggedUserDetailsRequestFailure,
} from "./Redux/Slices/UserSlices";
import axios from "axios";
import { StickyNavbar } from "./Components";

function App() {
  const dispatch = useDispatch();

  // const { error, success } = useSelector((state) => state.user);


  //getting the new c
  const getCurrentUserDetails = async () => {
    try {
      dispatch(getLoggedUserDetailsRequest());
      let res = "";
      if (import.meta.env.VITE_DEV_MODE == "production") {
        res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/me`);
      } else {
        res = await axios.get(`/api/v1/me`);
      }
      // console.log("res", res?.data);
      dispatch(getLoggedUserDetailsRequestSuccess(res?.data));
    } catch (error) {
      console.log(error?.response?.data);
      dispatch(getLoggedUserDetailsRequestFailure(error?.response?.data));
    }
  };

  useEffect(() => {
    getCurrentUserDetails();
  }, []);

  return (
    <>
      <div className="w-screen relative t  min-h-screen overflow-hidden p-4">
        <StickyNavbar />
        <Outlet />
        <ToastContainer
          stacked
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
