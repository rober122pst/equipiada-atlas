import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({ 
    user: { type : mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    game: { type : mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    rating: { type : Number, min: 0, max: 10, required: true }, // nota de 0 a 10
    comment: { type : String }, // comentário opcional
}, { timestamps: true });

export default mongoose.model('Rating', ratingSchema);