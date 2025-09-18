import mongoose from "mongoose";

const userGamesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  playedPlatforms: [{ type: String }], // Aceita múltiplas plataformas
  status: { type: String, enum: ["playing", "completed", "wishlist", "dropped"], default: "wishlist" },
  addedAt: { type: Date, default: Date.now },
  
  steam: { 
    steamAppId: { type: String },
    playtimeForever: { type: Number, default: 0 }, // em minutos
    lastPlayed: { type: Date},
    playtime_2weeks: { type: Number, default: 0 }, // em minutos
    achievementsPercent: { type: Number, min: 0, max: 100, default: 0 }, // porcentagem de conquistas desbloqueadas
    isPlatinum: { type: Boolean, default: false},
  },

  timesCompleted: { type: Number, default: 0 }, // Quantas vezes o jogo foi completado
  beatedTimestamps: [{ type: Date }], // Datas em que o jogo foi completado
  platinumTimestamps: [{ type: Date }], // Datas em que o troféu platina foi conquistado
  completedTimestamps: [{ type: Date }], // Datas em que o jogo foi completado

  rating: { 
        story: {type: Number},
        graphics: {type: Number},
        gameplay: {type: Number},
        sound: {type: Number},
     }, // nota de 0 a 10
    
  comment: { type : String }, // comentário opcional
  favorite: { type : Boolean, default: false }, // se é favorito
  difficulty: { type : String, enum: ['D', 'C', 'B', 'A', 'S', 'S+'] }, // dificuldade jogada

}, { timestamps: true });