import * as gamesController from '../controllers/gamesController.js';
import express from 'express';
const routes = express.Router();

routes.post("/", gamesController.createGame);
routes.get("/", gamesController.getGames);
routes.get("/:id", gamesController.getGameById);

export default routes;
