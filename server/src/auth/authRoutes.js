import express from "express";
import passport from "passport";
import * as auth from "./authController.js";
import { googleAuth } from "./googleAuthController.js";
import { connectSteamToAccount, steamAuth } from "./steamAuthController.js";

const router = express.Router();

// Tradicional
router.post("/register", auth.registerUser);
router.post("/login", auth.loginUser);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login` }), googleAuth);

router.post("/steam/connect", connectSteamToAccount);
// Passport Steam
router.get("/steam", passport.authenticate("steam"));
// Callback do Steam
router.get("/steam/return", passport.authenticate("steam", { failureRedirect: `${process.env.CLIENT_URL}/login` }), steamAuth);

router.get("/logout", (req, res) => {
  req.logout();
  res.clearCookie('token');
  res.redirect(`${process.env.CLIENT_URL}/login`);
});


export default router;
