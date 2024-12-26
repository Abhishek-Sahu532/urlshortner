import dotenv from "dotenv";
dotenv.config({
  path: "./src/.env",
});

import passport from "passport";
import { Strategy as GoogleOAuthStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

passport.use(
  new GoogleOAuthStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "https://vid-stream-two.vercel.app/auth/google/callback"
          : "http://localhost:8080/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOneAndUpdate(
          { googleId: profile.id },
          {
            googleId: profile.id,
            email: profile.emails[0].value,
            fullname: profile.displayName,
            avatar: profile.photos[0]?.value,
          },
          { upsert: true, new: true }
        );
        return done(null, user);
      } catch (error) {
        console.error("Error during Google OAuth Strategy:", error);
        return done(error, false);
      }
    }
  )
);

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  // Store user.googleId in the session
  done(null, user._id); // Make sure this is user.googleId and not user._id
});

// Deserialize user from the sessions
passport.deserializeUser(async (_id, done) => {
  try {
    // Find user by googleId instead of _id
    const user = await User.findOne({ _id });
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
