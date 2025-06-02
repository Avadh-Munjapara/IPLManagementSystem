import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
    withCredentials:true,
    baseURL:baseURL
})

export default {
    login:(data)=>api.post('/api/user/login',data)
}