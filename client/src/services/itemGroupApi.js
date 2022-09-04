import api from './apiConfig.js'

const itemGroupApiService = {
    get: async function(){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.get('/item-group')
            return data.data.docs
        }
        catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    create: async function(data){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            await api.post('/item-group',{data})
        }catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    update: async function(data){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            await api.put('/item-group',{data})
        }catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    delete: async function(data){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            await api.delete('/item-group',{data: {data}})
        }catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
}

export default itemGroupApiService;