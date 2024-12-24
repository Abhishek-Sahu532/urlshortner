import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect:
      process.env.NODE_ENV === "production"
        ? "https://vid-stream-client.vercel.app/"
        : "http://localhost:5173",
  })
);

// Failure route
router.get("/failure", (req, res) => res.send("Google authentication failed."));

export default router;
