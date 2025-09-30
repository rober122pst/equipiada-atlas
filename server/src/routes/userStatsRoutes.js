// routes/userStatsRoutes.js
import express from "express";
import {
  getProfileStats,
  addHours,
  addCompletedGame
} from "../controllers/userStatsController.js";

const router = express.Router();

router.get("/profile/:userId", getProfileStats);    // estatísticas do usuário
router.post("/hours", addHours);                   // adicionar horas
router.post("/completed-game", addCompletedGame);  // adicionar jogo zerado

export default router;