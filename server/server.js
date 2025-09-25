// CREATE - A criação de novos dados ou registos no sistema
// READ - A recuperação ou visualização de dados já existentes no sistema
// UPDATE - A modificação de dados que já foram registados no sistema
// DELETE - A remoção de dados do sistema
import mongoose from 'mongoose';
import express from 'express';
import routes from './src/routes/routes_api.js';

import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import gamesRoutes from './src/routes/gamesRoutes.js'
import userGamesRoutes from './src/routes/userGamesRoutes.js'

import dotenv from 'dotenv';

import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes)
app.use("/games", gamesRoutes)
app.use("/users", userGamesRoutes)
app.use("/users", userRoutes)

dotenv.config();

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Conexão com o banco de dados
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(routes);