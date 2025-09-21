import api from "./axiosConfig";

export const getUserGames = async (id, filters) => {
    try {
        const response = await api.get(`/api/users/${id}/usergames`, { params: filters })
        return response.data;
    } catch (e) {
        console.error("Error fetching user games:", e);
    }
};