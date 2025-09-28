import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {

        steamId: { type : String, unique: true, sparse: true }, // pode ser nulo
        googleId: { type: String, unique: true, sparse: true },
        name: { type : String, required: true, unique: true }, 
        email: { type : String, unique: true, sparse: true },
        passwordHash: { type : String },
        roles: { type : [String], default: ['user'] }, // 'user', 'admin'
        
        profile: {
            avatar: { type : String },
            followers: { type : [mongoose.Schema.Types.ObjectId], ref: 'User' },
            following: { type : [mongoose.Schema.Types.ObjectId], ref: 'User' },
            friends: { type : [mongoose.Schema.Types.ObjectId], ref: 'User' },
            links: {
                steam: { type : String },
                spotify: { type : String },
                instagram: { type : String }, 
            },
            public : { type : Boolean, default: true }, // se o perfil é público
            bannerURL: { type : String, default: '' },
            profPicURL: { type : String, default: '' },
            links: {
                steam: { type : String, default: '' },
                spotify: { type : String, default: '' },
                instagram: { type : String, default: '' },
            }
        }
    }, { timestamps: true });

export default mongoose.model("User", userSchema);