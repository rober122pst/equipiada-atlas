import api from "./axiosConfig";

export const getGames = async (filters) => {
    try {
        const response = await api.get('/api/games', { params: filters })
        return response.data;
    } catch (e) {
        console.error("Error fetching games:", e);
    }
};

export const getGameById = async (id) => {
    try {
        const response = await api.get(`/api/games/${id}`); 
        return response.data;
    } catch (e) {
        console.error(`Error fetching game with id ${id}:`, e);
    }
};