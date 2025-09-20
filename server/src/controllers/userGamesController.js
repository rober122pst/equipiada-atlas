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

    // List all user Games
module.exports = {

    async create(req, res){
        try{
            const userGame = new userGames(req.body);
            await userGame.save();
            res.status(201).json(userGame);
        } catch (error){
            res.status(400).json({message: error.message});
        }
    },

    async read(req, res){
        try{
            const userGamesList = await userGames.find();
            res.status(200).json({userGamesList});
        } catch (error){
            res.status(500).json({message: error.message});
        }
    },
    async update(req, res){
        try{
            const { id } = req.params;
            const userGame = await userGames.findByIdAndUpdate(id, req.body, {new: true});
            if(!userGame){
                return res.status(404).json({message: "User Game not found"});
            }
        } catch (error){
                res.status(400).json({message: error.message});
        };  
    },
    async delete(req, res){
        try{
            const { id } = req.params;
            const userGame = await userGames.findByIdAndDelete(id);
            if(!userGame){
                return res.status(404).json({message: "User Game not found"});
            }
            res.status(200).json({message: "User Game deleted successfully"});
        } catch (error){
                res.status(400).json({message: error.message});
        }
    }
};