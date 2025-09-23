import * as userGamesController from '../controllers/userGamesController.js';
import express from 'express';
const routes = express.Router();

routes.post("/:userId/usergames", userGamesController.createUserGame);
routes.get("/:userId/games", userGamesController.getUserGames);
routes.get("/:userId/games/totaltime", userGamesController.getTotalTime);
routes.get("/:userId/games/lastplayed", userGamesController.getLastPlayedGames);

export default routes;