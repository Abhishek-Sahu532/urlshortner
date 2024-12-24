import dotenv from "dotenv";

dotenv.config({
  path: "./src/.env",
});

import express from "express";
import cors from "cors";
import passport from "passport";
import "./middleware/google.auth.middleware.js";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

//cors setting
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CORS_ORIGIN
        : ["http://localhost:5173", "http://localhost:6000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

//passport configuration

app.use(passport.initialize());
app.use(passport.session());

import googleAuth from "./routes/userRoutes.js";

app.use("/auth", googleAuth);

import apiRouter from "./routes/apiRoutes.js";

app.use("/api/v1", apiRouter);

export default app;
