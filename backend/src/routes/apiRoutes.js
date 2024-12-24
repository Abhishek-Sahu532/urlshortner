import { Router } from "express";
import  {createShortUrl}  from "../controllers/apiControllers.js";

const router = Router();

// router.route("/login").post('createShortUrl');
router.route("/api/shorten").post(createShortUrl);

export default router;
