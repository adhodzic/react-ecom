import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    'Content-Type': 'application/json'
  })

api.interceptors.response.use((response) => response, (error) => {
if (error.response.status === 401) {
    window.location = '/login';
}
})
const itemFieldApiService = {
    get: async function(ItemGroupId){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.get('/item-field', {params: {ItemGroupId}})
            return data.data
        }
        catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    create: async function(itemData, parentId){
        try{
            const preparedData = {...itemData, ItemGroupId: parentId}
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.post('/item-field',preparedData)
            console.log(data)
        }catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    update: async function(itemData){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.put('/item-field',itemData)
            console.log(data)
        }catch(error){
            if(error.response.status === 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    }
}

export default itemFieldApiService;