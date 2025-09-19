// CREATE - A criação de novos dados ou registos no sistema
// READ - A recuperação ou visualização de dados já existentes no sistema
// UPDATE - A modificação de dados que já foram registados no sistema
// DELETE - A remoção de dados do sistema

const express = require ('express');
const routes = require('./src/models/routes');
const mongoose = require('mongoose');

// Conexão com o MongoDB
mongoose.connect("mongodb+srv://equipiada00:Equipi4d4_@equipiadaatlas.09gxdrn.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Conexão com o banco de dados
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const app = express();
app.use(routes);