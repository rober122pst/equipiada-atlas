import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express from 'express';

import authRoutes from './src/auth/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import gamesRoutes from './src/routes/gamesRoutes.js'
import userGamesRoutes from './src/routes/userGamesRoutes.js'

import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import './src/config/passport.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true
}));
app.use(cookieParser())
// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || "uma_senha_qualquer",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === "production"  } // secure true apenas em produção com HTTPS
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/auth", authRoutes)
app.use("/games", gamesRoutes)
app.use("/users", userGamesRoutes)
app.use("/users", userRoutes)

//  conexão MongoDB 
mongoose.connect(process.env.MONGODB_KEY)
  .then(() => console.log("Connected to Database"))
  .catch(err => console.error("Erro MongoDB:", err));

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));