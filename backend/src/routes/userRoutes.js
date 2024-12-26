import { Router } from "express";
import passport from "passport";
import { User } from "../models/user.model.js";
import { verifyTokens } from "../middleware/auth.middleware.js";
import { logoutUser, getUserDetails } from "../controllers/userControllers.js";

const router = Router();

export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.refreshAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    //to not touch the validation specially the password , just update the refresh token
    return { accessToken, refreshToken };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while generating access token",
    };
  }
};

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// router.route('/login').post( loginUser);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.redirect("/login");
      }
      // Generate tokens asynchronously
      const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
        user._id
      );
      const options = {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
      };

      res.cookie("accessToken", accessToken, options);
      res.cookie("refreshToken", refreshToken, options);
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

router.route("/logout").get(verifyTokens, logoutUser);

router.route("/me").get(verifyTokens, getUserDetails);

export default router;
