import express from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/authController.js";
import { googleAuth } from "../auth/googleAuthController.js";
import { steamLogin, addEmailSteamUser } from "../controllers/authSteamController.js";

const router = express.Router();

// Tradicional
router.post("/register", registerUser);
router.post("/login", loginUser);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), googleAuth);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

router.post("/steam", steamLogin)
router.post("/steam/email", addEmailSteamUser)

export default router;