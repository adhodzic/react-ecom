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
    create: async function(itemData){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.post('/item-group',itemData)
            console.log(data)
        }catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    update: async function(itemData, id){
        try{
            const preparedData = {...itemData, id: id}
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.put('/item-group',preparedData)
            console.log(data)
        }catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    }
}

export default itemGroupApiService;