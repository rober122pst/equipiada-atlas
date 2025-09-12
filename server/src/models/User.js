import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        steamId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        avatar: { type: String }, 
    }
);
export default mongoose.model("User", userSchema);