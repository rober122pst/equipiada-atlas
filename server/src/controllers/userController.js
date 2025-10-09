import User from "../models/User.js";

export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        // -password -email => não retornam do banco
        const user = await User.findById(userId).select('-passwordHash -email').lean();

        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
};

export const getMe = async (req, res) => {
    if (req.user) {
        res.json({
            id: req.user._id,
            name: req.user.name,
            profile: req.user.profile
        })
    }
}
export const checkEmailExists = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email é obrigatório." });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(200).json({ exists: true, message: "Email já cadastrado." });
        } else {
            return res.status(200).json({ exists: false, message: "Verified" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro no servidor." });
    }
};
