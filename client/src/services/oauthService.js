import api from "./axiosConfig";

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error.response.data);
    }
}
