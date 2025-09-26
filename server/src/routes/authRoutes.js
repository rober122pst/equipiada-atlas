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

const router = express.Router();

// Registro/Login padrão
router.post("/register", registerUser);
router.post("/login", loginUser);

// Login/Registro via Steam manual
router.post("/steam", steamLogin);
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

// usuaroo logado
router.get("/me", authenticateToken, getCurrentUser);

export default router;
