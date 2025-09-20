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
export default routes;