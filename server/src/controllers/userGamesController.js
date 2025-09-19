import { response } from "express";
import userGames from '../models/userGames';
export const createUserGame = async (req, res) => {
    try {
        const userGame = new userGames(req.body);
        await userGame.save();
        res.status(201).json(userGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }};
