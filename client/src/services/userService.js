import { redirect } from "react-router-dom";
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
    const res = fetch(`${import.meta.env.VITE_API_KEY}/users/me`, {
        method: "GET",
        credentials: "include",
    })
    return res;
}