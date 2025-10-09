import api from "./axiosConfig";

export const getUsers = async (filters) => {
    try {
        const response = await api.get('/users', { params: filters })
        return response.data;
    } catch (e) {
        console.error("Error fetching users:", e);
    }
};

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (e) {
        console.error(`Error fetching user with id ${id}:`, e);
    }
};

export const getMe = async () => {
    try {
        const res = await api.get('users/me')
        return res;
    }catch (e) {
        console.error("Nenhum usuário logado.", e)
    }
}