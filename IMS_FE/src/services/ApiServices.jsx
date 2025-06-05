// services/authService.js
import apiClient from './AxiosClient';
const token = localStorage.getItem('token')
const ApiServices = {
  register: (data) => apiClient.post('/api/user/register',data),
  login: (data) => apiClient.post('/api/user/login',data),
  getUser:() => apiClient.get('/api/user/getuser')
};

export default ApiServices;
