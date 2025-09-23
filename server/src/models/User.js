import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        steamId: { type : String, required: true, unique: true, sparse: true },
        name: { type : String, required: true }, 
        email: { type : String, required: true, unique: true },
        passwordHash: { type : String, required: true },
        roles: { type : [String], default: ['user'] }, // 'user', 'admin'
        
        profile: {
            avatar: { type : String },
            followers: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
            friends: { type : [mongoose.Schema.Types.ObjectId], ref: 'User' },
            links: {
                steam: { type : String },
                spotify: { type : String },
                instagram: { type : String }, 
            },
            public : { type : Boolean, default: true }, // se o perfil é público
        }
    }
);
export default mongoose.model("User", userSchema);