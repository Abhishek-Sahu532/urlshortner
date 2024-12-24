import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login, CreateForm } from "../Components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Oops</div>,
    children: [
      { path: "login", element: <Login /> },
      { path: "create", element: <CreateForm /> },
    ],
  },
]);

export default router;
