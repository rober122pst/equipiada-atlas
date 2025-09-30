// models/UserStats.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  game: String,
  amount: Number,
  date: Date
});

const gameSchema = new mongoose.Schema({
  title: String,
  year: Number
});

const userStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hoursByYear: { type: Map, of: Number },  // {2023: 100, 2024: 200}
  gamesCompleted: [gameSchema],
  expenses: [expenseSchema]
});

export default mongoose.model("UserStats", userStatsSchema);