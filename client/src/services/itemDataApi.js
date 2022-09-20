import api from './apiConfig.js'
const ROUTE = '/item-data';
const itemDataApiService = {
    get: async function(Item, ItemField){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.get(ROUTE, {params: {Item, ItemField}})
            return data.data
        }
        catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    create: async function(itemData){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.post(ROUTE,itemData)
            console.log(data)
        }catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    update: async function(itemData){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.put(ROUTE,itemData)
            console.log(data)
        }catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    delete: async function(data){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            await api.delete(ROUTE,{data: {data}})
        }catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
}

export default itemDataApiService;