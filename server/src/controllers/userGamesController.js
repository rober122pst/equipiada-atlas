import UserGames from '../models/userGames.js';

export const createUserGame = async (req, res) => {
    try {
        const userGame = new UserGames( { ...req.body, userId: req.params.userId } );
        await userGame.save();
        res.status(201).json(userGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserGames = async (req, res) => {
    try {
        const { userId } = req.params;
        const { gameId, favorite } = req.query;

        let query = { userId };

        if (favorite !== undefined) {
            query.favorite = favorite === 'true';
        }
        if (gameId) {
            query.gameId = gameId;
        }

        const userGamesList = await UserGames.find(query);
        res.status(200).json(userGamesList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTotalTime = async (req, res) => {
    try {
        const { userId } = req.params;

        // Busca todos os jogos do usuário
        const games = await UserGames.find({ userId });

        if (!games || games.length === 0) {
            return res.status(404).json({ message: "Nenhum jogo encontrado para este usuário." });
            }

        // Soma o tempo total (em minutos)
        const totalMinutes = games.reduce((acc, game) => {
            return acc + (game.steam?.playtimeForever || 0);
        }, 0);

        // Converte minutos para horas e minutos
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        res.json({
            userId,
            totalMinutes,
            formatted: `${hours}h ${minutes}m`
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao calcular tempo total de jogo." });
    }
}

export const getLastPlayedGames = async (req, res) => {
  try {
    const { userId } = req.params;
    const { count } = req.query;
    const limit = parseInt(count) || 10; // número de jogos a retornar, padrão 10

    // busca os jogos do usuário, ordenando pelo campo steam.lastPlayed (mais recentes primeiro)
    const games = await UserGames.find({ userId, "steam.lastPlayed": { $ne: null } })
      .sort({ "steam.lastPlayed": -1 }) // -1 = decrescente (mais recente primeiro)
      .limit(limit); // opcional: retorna só os 10 mais recentes

    if (!games || games.length === 0) {
      return res.status(404).json({ message: "Nenhum jogo encontrado para este usuário." });
    }

    res.json({
      userId,
      recentGames: games.map(game => ({
        gameId: game.gameId,
        steamAppId: game.steam?.steamAppId || null,
        lastPlayed: game.steam?.lastPlayed || null,
        playtimeForever: game.steam?.playtimeForever || 0
      }))
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar jogos recentes do usuário." });
  }
}



    // List all user Games
// module.exports = {

//     async create(req, res){
//         try{
//             const userGame = new userGames(req.body);
//             await userGame.save();
//             res.status(201).json(userGame);
//         } catch (error){
//             res.status(400).json({message: error.message});
//         }
//     },

//     async read(req, res){
//         try{
//             const userGamesList = await userGames.find();
//             res.status(200).json({userGamesList});
//         } catch (error){
//             res.status(500).json({message: error.message});
//         }
//     },
//     async update(req, res){
//         try{
//             const { id } = req.params;
//             const userGame = await userGames.findByIdAndUpdate(id, req.body, {new: true});
//             if(!userGame){
//                 return res.status(404).json({message: "User Game not found"});
//             }
//         } catch (error){
//                 res.status(400).json({message: error.message});
//         };  
//     },
//     async delete(req, res){
//         try{
//             const { id } = req.params;
//             const userGame = await userGames.findByIdAndDelete(id);
//             if(!userGame){
//                 return res.status(404).json({message: "User Game not found"});
//             }
//             res.status(200).json({message: "User Game deleted successfully"});
//         } catch (error){
//                 res.status(400).json({message: error.message});
//         }
//     }
// };