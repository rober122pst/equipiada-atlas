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
routes.get("/api/games", gamesController.getGames);
routes.get("/api/games/:id", gamesController.getGameById);
routes.get("/api/users/:id", userController.getUserById);
routes.post("/api/users/:userId/usergames", userGamesController.createUserGame);
routes.get("/api/users/:userId/usergames", userGamesController.getUserGames);
export default routes;