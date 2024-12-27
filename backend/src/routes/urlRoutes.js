import { Router } from "express";
import  {createShortUrl, getDetailsByAlias}  from "../controllers/apiControllers.js";
import { verifyTokens } from "../middleware/auth.middleware.js";

const router = Router();

// router.route("/login").post('createShortUrl');
router.route("/api/shorten").post(verifyTokens,  createShortUrl);
router.route("/api/shorten/:alias").get(verifyTokens,  getDetailsByAlias);

export default router;
