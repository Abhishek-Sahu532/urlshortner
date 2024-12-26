import { Router } from "express";
import  {createShortUrl}  from "../controllers/apiControllers.js";
import { verifyTokens } from "../middleware/auth.middleware.js";

const router = Router();

// router.route("/login").post('createShortUrl');
router.route("/api/shorten").post(verifyTokens,  createShortUrl);

export default router;
