import api from './apiConfig.js'

const userApiService = {
    get: async function (){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const res = await api.get('/get-all-users')
            return res.data
        }
        catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },

        saveUserData: async function (userData){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const transformData = {
                Username: userData.username,
                FullName: userData.fullName,
                Role: userData.role
            }
            const res = await api.put('/user',{newData: transformData})
        }
        catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    getUserData: async function (userdata){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const res = await api.get('/user',{...userdata})
            return res.data
        }
        catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    saveUserData: async function (userData){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const transformData = {
                Username: userData.username,
                FullName: userData.fullName,
                Role: userData.role
            }
            const res = await api.put('/user',{newData: transformData})
        }
        catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    loginUser: async function (userdata){
        try{
            const res = await api.post('/login',{...userdata})
            return res.data
        }catch(error){
            return {error: error.response.data.error, isError: true}
        }
    },
    registerUser: async function (userdata){
        try{
            const res = await api.post('/register',{...userdata})
            return res.data
        }catch(error){
            return {error: error.response.data.error, isError: true}
        }
    }
}

export default  userApiService