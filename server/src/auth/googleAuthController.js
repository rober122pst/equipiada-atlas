import { generateToken } from "./tokenService.js";

export const googleAuth = (req, res) => {
    const token = generateToken(req.user);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" 
    });
    res.redirect(`${process.env.CLIENT_URL}/u/${req.user._id}`);
    return res.status(200).json({ message: "Login com google bem sucedido." });
}