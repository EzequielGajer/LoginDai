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
    const response = await api.post('/user/register', {
      'first_name': nombre,
      'last_name': apellido,
      'username': username,
      'password': password
  });
    console.log(response)
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log('error', error)
    throw error.response ? error.response.data : error;
  }
};
// Función para obtener los eventos
export const getEventos = async () => {
  try {
    const response = await api.get(`/event`);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    throw error; // Lanza el error para que el componente pueda manejarlo
  }
};

// Puedes agregar otras funciones de la API aquí, por ejemplo:

// Función para obtener el detalle de un evento
export const getEventoById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/event/${id}`);
    return response.data; // Devuelve los datos del evento
  } catch (error) {
    console.error(`Error al obtener el evento con id ${id}:`, error);
    throw error;
  }
};

// Función para crear un nuevo evento (si es necesario)
export const createEvento = async (eventoData) => {
  try {
    const response = await axios.post(`${baseUrl}/event`, eventoData);
    return response.data; // Devuelve los datos del nuevo evento creado
  } catch (error) {
    console.error('Error al crear el evento:', error);
    throw error;
  }
};
