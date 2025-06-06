// services/authService.js
import { AxiosHeaders } from 'axios';
import apiClient from './AxiosClient';
const token = localStorage.getItem('token')


const ApiServices = {
  //user related services
  register: (data) => apiClient.post('/api/user/register',data),
  login: (data) => apiClient.post('/api/user/login',data),
  getUser:() => apiClient.get('/api/user/getuser'),
  getUserById:(id) => apiClient.get(`/api/user/getUserById/${id}`),

  //team related services
  getAllTeams:()=>apiClient.get('/api/team/all'),
  createTeam:(data)=>apiClient.post('/api/team/create',data), 
  editTeamForTo:(data)=>apiClient.put('/api/team/editForTo',data),
  editTeamForAdmin:(data)=>apiClient.put('/api/team/editForAdmin',data),
  deleteTeam:(data)=>apiClient.delete('/api/team/remove', { data }),
  getTeam:(id)=>apiClient.get(`/api/team/${id}`),

  //player related services
  getPlayers:()=>apiClient.get('/api/player/getAll'),
  getPlayerById:(id) => apiClient.get(`/api/player/${id}`),
  updatePlayer:(data) => apiClient.put('/api/player/update', data),
  createPlayer:(data) => apiClient.post('/api/player/create', data),


};

export default ApiServices;
