import * as userController from '../controllers/userController.js';
import express from 'express';
import { authenticateToken } from '../controllers/authController.js';
const routes = express.Router();


routes.get("/", userController.getUsers);
routes.get("/me", authenticateToken, userController.getMe)
routes.get("/:id", userController.getUserById);

export default routes;
