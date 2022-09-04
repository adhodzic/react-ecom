import axios from 'axios'
const api = axios.create({
    baseURL: '35.156.71.117:5000/api',
    'Content-Type': 'application/json'
})

api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        window.location = '/login';
    }
})

export default api;