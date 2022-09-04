import axios from 'axios'
const api = axios.create({
    baseURL: process.env.API_URL,
    'Content-Type': 'application/json'
})

api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        window.location = '/login';
    }
    })

export default api;