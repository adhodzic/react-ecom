import api from './apiConfig.js'

const itemApiService = {
    get: async function(){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.get('/item')
            return data
        }
        catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    getOne: async function(id){
        try{
            console.log(id)
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.get('/item',{params: {id}})
            return data.data.docs
        }
        catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    create: async function(itemData){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.post('/item',itemData)
            console.log(data)
        }catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    update: async function(itemData){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.put('/item',itemData)
            console.log(data)
        }catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    }
}

export default itemApiService;