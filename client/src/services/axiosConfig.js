import axios from 'axios';

const api = axios.create({
    baseURL: 'https://logg-m43c.onrender.com'
});

export default api;