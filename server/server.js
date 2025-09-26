// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";

import "./src/config/passport.js"; // config do Passport Steam
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import gamesRoutes from "./src/routes/gamesRoutes.js";
import userGamesRoutes from "./src/routes/userGamesRoutes.js";
import routes from "./src/routes/routes_api.js";

dotenv.config();

const app = express();

//  Middlewares 
app.use(express.json());
app.use(cookieParser()); // ler cookies
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

//  Sessão para passport steam
app.use(session({
  secret: process.env.SESSION_SECRET || "uma_senha_qualquer",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // secure true apenas em produção com HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Rotas 
app.use("/auth", authRoutes);
app.use("/games", gamesRoutes);
app.use("/users", userGamesRoutes);
app.use("/users", userRoutes);
app.use(routes);

//  Conexão MongoDB 
mongoose.connect(process.env.MONGODB_KEY)
  .then(() => console.log("Connected to Database"))
  .catch(err => console.error("Erro MongoDB:", err));

// Start do servidor 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
