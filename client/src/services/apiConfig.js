import axios from 'axios'
const api = axios.create({
    baseURL: process.env.NODE_ENV == 'production'? process.env.BASE_URL : 'http://localhost:5000/api',
    'Content-Type': 'application/json'
})

api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        window.location = '/login';
    }
    })

export default api;