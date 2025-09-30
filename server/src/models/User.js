import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        steamId: { type : String, unique: true, sparse: true }, // pode ser nulo
        googleId: { type: String, unique: true, sparse: true },
        name: { type : String, required: true }, 
        email: { type : String, unique: true, sparse: true },
        passwordHash: { type : String },
        roles: { type : [String], default: ['user'] }, // 'user', 'admin'
        
        profile: {
            followers: { type : [mongoose.Schema.Types.ObjectId], ref: 'User' },
            following: { type : [mongoose.Schema.Types.ObjectId], ref: 'User' },
            friends: { type : [mongoose.Schema.Types.ObjectId], ref: 'User' },
            links: {
                steam: { 
                    name: { type: String },
                    url: { type: String }, 
                },
                spotify: { 
                    name: { type: String },
                    url: { type: String },
                },
                instagram: { 
                    name: { type: String },
                    url: { type: String },
                },
            },
            public : { type : Boolean, default: true }, // se o perfil é público
            bannerURL: { type : String, default: '' },
            profPicURL: { type : String, default: '' },
        }
    }, { timestamps: true });

export default mongoose.model("User", userSchema);