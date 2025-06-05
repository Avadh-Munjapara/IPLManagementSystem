// services/authService.js
import apiClient from './AxiosClient';

const ApiServices = {
  register: (data) => apiClient.post('/api/user/register', data),
  login: (data) => apiClient.post('/api/user/login',data),
};

export default ApiServices;
