import axios from 'axios'
const production_api = process.env.REACT_APP_API_URL;
const env = process.env.NODE_ENV
const api = axios.create({
    baseURL: env != 'production' ? 'http://localhost:5000/api': production_api,
    'Content-Type': 'application/json'
})

api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        window.location = '/login';
    }
})

export default api;