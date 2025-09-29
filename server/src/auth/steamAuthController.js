import { generateToken } from "./tokenService.js";
import User from "../models/User.js";

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

export const steamAuth = (req, res) => {
    const token = generateToken(req.user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" 
    });

    res.redirect(`${process.env.CLIENT_URL}/u/${req.user._id}`);
};