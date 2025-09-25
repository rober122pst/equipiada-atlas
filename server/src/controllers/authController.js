import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export { generateToken };

//                  Gerar JWT 
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, roles: user.roles || ["user"] },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

//                   Cadastro normal 
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
    res.status(500).json({ message: err.message });
  }
};

//                   Login normal 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email não encontrado" });

    const validPassword = await bcrypt.compare(password, user.passwordHash); // Compara as senhas
    if (!validPassword) return res.status(400).json({ message: "Senha incorreta" });

    const token = generateToken(user);

    res.json({
      message: "Login realizado",
      user: { id: user._id, name: user.name, email: user.email, profile: user.profile },
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//                  Middleware JWT 
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
