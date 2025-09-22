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
