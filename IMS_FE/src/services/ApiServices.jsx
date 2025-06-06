// services/authService.js
import { AxiosHeaders } from 'axios';
import apiClient from './AxiosClient';
const token = localStorage.getItem('token')
const ApiServices = {
  register: (data) => apiClient.post('/api/user/register',data),
  login: (data) => apiClient.post('/api/user/login',data),
  getUser:() => apiClient.get('/api/user/getuser'),
  getTemaByOwner: (ownerId) => apiClient.get(`/api/teams/ownerTeam/${ownerId}`),
  getAllTeams:()=>apiClient.get('/api/team/all'),
  createTeam:(data)=>apiClient.post('/api/team/create',data), 
  editTeamForTo:(data)=>apiClient.put('/api/team/editForTo',data),
  editTeamForAdmin:(data)=>apiClient.put('/api/team/editForAdmin',data),
  deleteTeam:(data)=>apiClient.delete('/api/team/remove', { data }),
  getTeam:(id)=>apiClient.get(`/api/team/${id}`),

  getPlayers:()=>apiClient.get('/api/player/getAll')


};

export default ApiServices;
