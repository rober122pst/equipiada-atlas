import express from 'express';
const routes = express.Router();
import * as userGamesController from '../controllers/userGamesController.js';
import * as userController from '../controllers/userController.js';
import * as gamesController from '../controllers/gamesController.js';
routes.get("/", (req, res) => {
    res.send("API is running");
});
routes.post("/api/users", userController.createUser);
routes.post("/api/games", gamesController.createGame);
routes.post("/api/usergames", userGamesController.createUserGame);
routes.get("/api/usergames", userGamesController.getUserGames);
routes.get("/api/users/:id", userController.getUserById);
router.get("/user/:userId/total-playtime", async (req, res) => {
  try {
    const { userId } = req.params;

    // Busca todos os jogos do usuário
    const games = await userGamesSchema.find({ userId });

    if (!games || games.length === 0) {
      return res.status(404).json({ message: "Nenhum jogo encontrado para este usuário." });
    }

    // Soma o tempo total (em minutos)
    const totalMinutes = games.reduce((acc, game) => {
      return acc + (game.steam?.playtimeForever || 0);
    }, 0);

    // Converte minutos para horas e minutos
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    res.json({
      userId,
      totalMinutes,
      formatted: `${hours}h ${minutes}m`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao calcular tempo total de jogo." });
  }
});
router.get("/user/:userId/recent-games", async (req, res) => {
  try {
    const { userId } = req.params;

    // busca os jogos do usuário, ordenando pelo campo steam.lastPlayed (mais recentes primeiro)
    const games = await userGamesSchema.find({ userId })
      .sort({ "steam.lastPlayed": -1 }) // -1 = decrescente (mais recente primeiro)
      .limit(10); // opcional: retorna só os 10 mais recentes

    if (!games || games.length === 0) {
      return res.status(404).json({ message: "Nenhum jogo encontrado para este usuário." });
    }

    res.json({
      userId,
      recentGames: games.map(game => ({
        gameId: game.gameId,
        steamAppId: game.steam?.steamAppId || null,
        lastPlayed: game.steam?.lastPlayed || null,
        playtimeForever: game.steam?.playtimeForever || 0
      }))
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar jogos recentes do usuário." });
  }
});
export default routes;