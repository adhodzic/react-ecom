import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    'Content-Type': 'application/json'
  })

const apiService = {
    getUserData: async function (userdata){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const res = await api.get('/user',{...userdata})
            return res.data
        }
        catch(error){
            if(error.response.status) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    loginUser: async function (userdata){
        const res = await api.post('/login',{...userdata})
        return res.data
    }
}

export default  apiService