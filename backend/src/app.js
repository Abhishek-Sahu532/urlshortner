import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CORS_ORIGIN
        : ["http://localhost:5173", "http://localhost:8000"],

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));


// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Internal Server Error" });
// });


console.log('ddddddddddd', process.env.ACCESS_TOKEN_SECRET)

// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGODB_URI, // Your MongoDB connection string
//       collectionName: "sessions", // Optional: Collection name for storing sessions
//     }),
//     secret: process.env.ACCESS_TOKEN_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: true,
//       sameSite: "none",
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     },
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.redirect("/login"); // Handle if user is not authenticated
      }

      // Generate tokens asynchronously
      //   const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      //     user._id
      //   );

      const options = {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
      };

      // Set cookies with the generated tokens
      //   res.cookie("accessToken", accessToken, options);
      //   res.cookie("refreshToken", refreshToken, options);

      // console.log("user from password block", user);
      // Redirect to frontend after successful login
      const redirectUrl =
        process.env.NODE_ENV === "production"
          ? "https://vid-stream-client.vercel.app/"
          : "http://localhost:5173/";
      res.redirect(redirectUrl);
    } catch (error) {
      console.error("Error in Google authentication callback:", error);
      res.redirect("/login"); // Redirect to login in case of an error
    }
  }
);

export default app;
