import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

export default  {
    login:() => apiClient.post('/auth/login'),
    register: (userData) => apiClient.post('/auth/register', userData),
}