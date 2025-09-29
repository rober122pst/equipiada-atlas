import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "./tokenService.js";

//                    Registro via Email         
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Nome, email e senha são obrigatórios" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email já cadastrado" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, passwordHash });
    await user.save();

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" 
    });
  } catch (err) {
    console.error("Erro no registro via email:", err);
    res.status(500).json({ message: err.message });
  }
};

//                 Login via Email 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email não encontrado" });

    const validPassword = bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(400).json({ message: "Senha incorreta" });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" 
    });
  } catch (err) {
    console.error("Erro no login via email:", err);
    res.status(500).json({ message: err.message });
  }
};