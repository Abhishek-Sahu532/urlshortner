import { Outlet } from "react-router";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="w-screen relative t  min-h-screen">
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
