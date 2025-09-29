import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { generateToken } from "./authController.js";

// Busca API Steam
const getSteamProfile = async (steamId) => {
    const apiKey = process.env.STEAM_KEY;

    console.log("Steam Key:", apiKey); // DEBUG: verificar se a Key está chegando
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`;
    console.log("URL Steam API:", url); // DEBUG: verificar URL gerada

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro ao buscar perfil Steam: ${response.status} ${response.statusText}`);

    const data = await response.json();

    // Corrigido typo: 'length' e não 'lenght'
    if (!data.response.players.length) throw new Error("SteamId inválido ou perfil privado");

    const player = data.response.players[0];
    return {
        steamId: player.steamid,
        personaName: player.personaname,
        profileUrl: player.profileurl,
        avatar: player.avatarfull,
    };
};

// LOGIN VIA STEAM
export const steamLogin = async (req, res) => {
    try {
        const { steamId } = req.body;
        if (!steamId) return res.status(400).json({ message: "SteamId obrigatório" });

        // Buscando dados
        const steamProfile = await getSteamProfile(steamId);

        let user = await User.findOne({ steamId }); // corrigido: findOne, não User.steamId

        if (!user) {
            // Cria usuário parcial
            user = new User({
                steamId: steamProfile.steamId,
                name: steamProfile.personaName,
                profile: {
                    avatar: steamProfile.avatar,
                    links: { steam: steamProfile.profileUrl },
                }
            });

            await user.save();
            return res.status(200).json({
                message: "Conta Steam criada. Complete com email.",
                token: generateToken(user),
            });
        }

        // Gerar token para usuário existente
        const token = generateToken(user);
        res.status(200).json({ message: "Login pela Steam realizado", user, token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Adiciona email e senha após Login pela Steam
export const addEmailSteamUser = async (req, res) => {
    try {
        const { steamId, email, password } = req.body;
        if (!steamId || !email) return res.status(400).json({ message: "SteamId e email são obrigatórios" });

        // Checar se o email já está em uso
        const existingEmail = await User.findOne({ email });
        if (existingEmail) return res.status(400).json({ message: "Email já cadastrado" });

        const user = await User.findOne({ steamId });
        if (!user) return res.status(404).json({ message: "Usuário Steam não encontrado" });

        // Adicionar senha se fornecida
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.passwordHash = await bcrypt.hash(password, salt);
        }

        user.email = email;
        await user.save();

        const token = generateToken(user);
        res.status(200).json({ message: "Email adicionado com sucesso", user, token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
