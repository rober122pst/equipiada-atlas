
import User from "../models/User.js";
import jwt from "jsonwebtoken";

//                  Middleware JWT 
export const authenticateToken = async (req, res, next) => {
  try {
    // const token = req.cookies.token;
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.sendStatus(401).json({ message: "Acesso negado." });

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select('-passwordHash -email').lean();

    req.user = user;
    next();
  } catch (error) {
    console.error("Nenhum usuário autenticado")
  }
};