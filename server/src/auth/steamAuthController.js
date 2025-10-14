import { generateToken } from "./tokenService.js";
import User from "../models/User.js";
import { getSteamProfile } from "./steamService.js"

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

    res.redirect(`${process.env.CLIENT_URL}/`);
};