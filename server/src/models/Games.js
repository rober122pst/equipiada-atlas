import mongoose from "mongoose";
const gameSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },   
  genres: [{ type: String }], 
  platforms: [{ type: String }],
  releaseDate: { type: Date }, 
  coverURL: { type: String },  
  screenshots: [{ type: String }],
  description: { type: String },
  externalIds: {
    steam: { type: String },
    igdb: { type: String },
    rawg: { type: String },
  },
  preferedSource: { type: String, enum: ['steam', 'igdb', 'rawg'], default: 'rawg' },
  ratings: { metacritic: { type: Number, min: 0, max: 100 }  },
}, { timestamps: true });

export default mongoose.model("Game", gameSchema);