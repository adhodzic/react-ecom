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
const apiService = {
    get: async function({ItemGroupId}){
        try{
            console.log(ItemGroupId)
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.get('/item-field', {params: {id: ItemGroupId}})
            return data
        }
        catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    create: async function(itemData){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.post('/item-field',itemData)
            console.log(data)
        }catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    },
    update: async function(itemData){
        try{
            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            const data = await api.put('/item-field',itemData)
            console.log(data)
        }catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    }
}

export default apiService;