import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export function Login() {
  // const handleOpen = () => setOpen(!open);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, currentUser } = useSelector((state) => state.user);
  const handleLogin = () => {
    const backendUrl =
      import.meta.env.VITE_DEV_MODE === "production"
        ? "https://vid-stream-two.vercel.app/auth/google"
        : "http://localhost:8080/auth/google";
    window.open(backendUrl, "_self");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      navigate("/");
    }
  }, [error, success]);
  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Modal
      </Button> */}
      <Dialog
        open={true}
        // handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        {/* <DialogHeader>Its a simple modal.</DialogHeader> */}
        <DialogBody>Login/Signup with just 1 click below.</DialogBody>
        <DialogFooter>
          <Button
            variant="outlined"
            size="lg"
            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
            fullWidth
            onClick={handleLogin}
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign in with google
          </Button>
          By creating an account you agree with our Terms of Service, Privacy
          Policy
        </DialogFooter>
      </Dialog>
    </>
  );
}
