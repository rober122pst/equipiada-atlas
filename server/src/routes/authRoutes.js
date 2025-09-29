import express from "express";
import passport from "passport";
import { 
  registerUser, 
  loginUser, 
  steamLogin, 
  connectSteamToAccount, 
  generateToken,
  authenticateToken,
  getCurrentUser
} from "../controllers/authController.js";
import { googleAuth } from "../auth/googleAuthController.js";

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
router.post("/steam/connect", connectSteamToAccount);

// Passport Steam
router.get("/steam/login", passport.authenticate("steam"));

// Callback do Steam
router.get("/steam/return", 
  passport.authenticate("steam", { failureRedirect: "/auth/login" }),
  (req, res) => {
    const token = generateToken(req.user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // localhost
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect("http://localhost:5173/steam-success");
  }
);

export default router;
