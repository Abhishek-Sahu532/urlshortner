import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login, CreateForm } from "../Components";
import { ProtectedRoutes } from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <div>Oops</div>,
    children: [
      {
        path: "/",
        element: <ProtectedRoutes />,
        children: [{ index: true }],
      },
      { path: "/login", element: <Login /> },
      {
        path: "/create",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <CreateForm /> }],
      },
    ],
  },
]);

export default router;
