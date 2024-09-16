import axios from 'axios';
const api = axios.create({
  baseURL: 'https://famous-abnormally-calf.ngrok-free.app/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const login = async (username, password) => {
  try {
    const response = await api.post('/user/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const register = async (nombre,apellido,username, password) => {
  try {
    const response = await api.post('/user/register', { nombre,apellido,username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

