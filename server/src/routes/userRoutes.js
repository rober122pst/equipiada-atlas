import * as userController from '../controllers/userController.js';
import express from 'express';
const routes = express.Router();

routes.get("/", userController.getUsers);
routes.get("/:id", userController.getUserById);

export default routes;
