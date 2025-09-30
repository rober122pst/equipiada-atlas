// controllers/userStatsController.js
import UserStats from "../models/userStats.js";

// pegar estatísticas completas para exibir no profile
export const getProfileStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const stats = await UserStats.findOne({ userId }).lean();

    if (!stats) {
      return res.status(404).json({ message: "Nenhuma estatística encontrada." });
    }

    // calcular total de gastos
    const totalExpenses = stats.expenses.reduce((acc, e) => acc + e.amount, 0);

    res.json({
      hoursByYear: stats.hoursByYear,
      totalHours: Object.values(stats.hoursByYear).reduce((a, b) => a + b, 0),
      gamesCompleted: stats.gamesCompleted,
      totalGamesCompleted: stats.gamesCompleted.length,
      expenses: stats.expenses,
      totalExpenses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// adicionar horas
export const addHours = async (req, res) => {
  try {
    const { userId, year, hours } = req.body;
    const stats = await UserStats.findOneAndUpdate(
      { userId },
      { $inc: { [`hoursByYear.${year}`]: hours } },
      { new: true, upsert: true }
    );
    res.json(stats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// adicionar jogo zerado
export const addCompletedGame = async (req, res) => {
  try {
    const { userId, title, year } = req.body;
    const stats = await UserStats.findOneAndUpdate(
      { userId },
      { $push: { gamesCompleted: { title, year } } },
      { new: true, upsert: true }
    );
    res.json(stats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};