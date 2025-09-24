import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { steamLogin, addEmailSteamUser } from "../controllers/authSteamController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)

router.post("/steam", steamLogin)
router.post("/steam/email", addEmailSteamUser)

export default router;