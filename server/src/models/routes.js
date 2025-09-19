const express = require ('express');
const routes = express.Router();

const userGamesController = require('../controllers/userGamesController');

routes.get("/", (req, res) => {});
routes.post("/userGames", userGamesController.create);
routes.get("/userGames", userGamesController.read);
routes.put("/userGames/:id", userGamesController.update);
routes.delete("/userGames/:id", userGamesController.delete);

module.exports = routes;