import api from "./axiosConfig";

export const getUsers = async (filters) => {
    try {
        const response = await api.get('/api/users', { params: filters })
        return response.data;
    } catch (e) {
        console.error("Error fetching users:", e);
    }
};

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/api/users/${id}`);
        return response.data;
    } catch (e) {
        console.error(`Error fetching user with id ${id}:`, e);
    }
};