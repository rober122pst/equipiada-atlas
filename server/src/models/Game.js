import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({

    title: { type: String, required: true },  //Game name
    genre: { type: String, required: true },  //Game genre
    releaseDate: { type: Date },  //Release date
    platform: { type: String },  //Platform
    gameCover: { type: String }, //Game cover image URL
});

export default mongoose.model("Game", gameSchema);