import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import passport from "passport";
import SteamStrategy from "passport-steam";

//             Passport Steam
// Configuração do Passport para login via Steam
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:1987/auth/steam/return', // URL de callback
    realm: 'http://localhost:1987/',
    apiKey: process.env.STEAM_KEY
  },
  async function(identifier, profile, done) {
    try {
      const steamId = profile.id;
      let user = await User.findOne({ steamId });
      if (!user) {
        user = new User({
          steamId,
          name: profile.displayName,
          profile: {
            avatar: profile.photos[2]?.value || '',
            links: { steam: profile._json.profileurl }
          }
        });
        await user.save();
        console.log("Usuário Steam criado:", steamId);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize e Deserialize do Passport
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

//                     JWT 
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, roles: user.roles || ["user"] },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Config Steam API 
const getSteamProfile = async (steamId) => {
  const apiKey = process.env.STEAM_KEY;
  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erro ao buscar perfil Steam: ${response.status} ${response.statusText}`);

  const data = await response.json();
  if (!data.response.players.length) throw new Error("SteamId inválido ou perfil privado");

  const player = data.response.players[0];
  return {
    steamId: player.steamid,
    personaName: player.personaname,
    profileUrl: player.profileurl,
    avatar: player.avatarfull,
  };
};

//                    Registro via Email         
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Nome, email e senha são obrigatórios" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email já cadastrado" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, passwordHash });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({
      message: "Usuário criado",
      user: { id: user._id, name: user.name, email: user.email, profile: user.profile },
      token
    });
  } catch (err) {
    console.error("Erro no registro via email:", err);
    res.status(500).json({ message: err.message });
  }
};

//                 Login via Email 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email não encontrado" });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(400).json({ message: "Senha incorreta" });

    const token = generateToken(user);
    res.json({
      message: "Login realizado",
      user: { id: user._id, name: user.name, email: user.email, profile: user.profile },
      token
    });
  } catch (err) {
    console.error("Erro no login via email:", err);
    res.status(500).json({ message: err.message });
  }
};

//                 Login / Registro via Steam 
export const steamLogin = async (req, res) => {
  try {
    const { steamId } = req.body;
    if (!steamId) return res.status(400).json({ message: "SteamId obrigatório" });

    const steamProfile = await getSteamProfile(steamId);

    let user = await User.findOne({ steamId });

    if (!user) {
      // Cria usuario parcial com Steam
      user = new User({
        steamId: steamProfile.steamId,
        name: steamProfile.personaName,
        profile: {
          avatar: steamProfile.avatar,
          links: { steam: steamProfile.profileUrl },
        }
      });

      await user.save();
      console.log("Usuário Steam criado:", user.steamId);
      return res.status(200).json({
        message: "Conta Steam criada. Complete com email se desejar.",
        user,
        token: generateToken(user),
      });
    }

    // Gerar token para usuário existente
    const token = generateToken(user);
    res.status(200).json({ message: "Login pela Steam realizado", user, token });
  } catch (err) {
    console.error("Erro no login via Steam:", err);
    res.status(500).json({ message: err.message });
  }
};

//               Conectar Steam a conta existente         
export const connectSteamToAccount = async (req, res) => {
  try {
    const { steamId, email } = req.body;
    if (!steamId || !email) return res.status(400).json({ message: "SteamId e email são obrigatórios" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuário com este email não encontrado" });

    const existingSteam = await User.findOne({ steamId });
    if (existingSteam && existingSteam.email !== email) return res.status(400).json({ message: "Esta Steam já está vinculada a outra conta" });

    // Conectar Steam
    const steamProfile = await getSteamProfile(steamId);
    user.steamId = steamProfile.steamId;
    user.profile.avatar = steamProfile.avatar;
    user.profile.links.steam = steamProfile.profileUrl;
    await user.save();

    console.log(`Steam conectada ao usuário ${email}: ${steamId}`);
    const token = generateToken(user);
    res.status(200).json({ message: "Steam conectada com sucesso", user, token });
  } catch (err) {
    console.error("Erro ao conectar Steam:", err);
    res.status(500).json({ message: err.message });
  }
};

//                   Middleware JWT 
export const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token não encontrado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = decoded;
    next();
  });
};



export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
