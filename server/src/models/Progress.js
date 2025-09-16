import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    userId: { type : mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    gameId: { type : mongoose.Schema.Types.ObjectId, ref: 'Game', required: true},
    hoursPlayed: { type : Number, default: 0}, // Hours played
    achievementsUnlocked: { type : Number, default: 0}, // Number of achievements unlocked
    completion: { type : Number, default: 0}, // Percentage of game completed
}, { timestamps: true });

export default mongoose.model('Progress', progressSchema);