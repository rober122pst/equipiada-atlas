import api from "./axiosConfig";

export const getUserGames = async (id, filters) => {
    try {
        const response = await api.get(`/users/${id}/games`, { params: filters })
        return response.data;
    } catch (e) {
        console.error("Error fetching user games:", e);
    }
};