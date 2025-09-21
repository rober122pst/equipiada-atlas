import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:1987'
});

export default api;