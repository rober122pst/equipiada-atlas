import jwt from "jsonwebtoken";

//                  Gerar JWT 
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, roles: user.roles || ["user"] },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};