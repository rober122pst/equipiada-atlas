import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },   

  // Agora aceita múltiplos gêneros
  genres: [{ type: String }],                 

  // Agora aceita múltiplas plataformas
  platforms: [{ type: String }],              

  releaseDate: { type: Date },                
}, { timestamps: true });

export default mongoose.model("Game", gameSchema);