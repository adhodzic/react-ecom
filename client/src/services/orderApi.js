import axios from 'axios'
const api = axios.create({
    baseURL: 'http://127.0.0.1:9000/',
    'Content-Type': 'application/json'
  })

api.interceptors.response.use((response) => response, (error) => {
if (error.response.status === 401) {
    window.location = '/login';
}
})
const orderApiService = {
    create: async function(items){
        try{
            const data = await api.post('/model/order_model.bpmn/instance')
            return data.data
        }catch(error){
            if(error.response.status == 401) localStorage.removeItem('token')
            return {error, isError: true}
        }
    }
}

export default orderApiService;