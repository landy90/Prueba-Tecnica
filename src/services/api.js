import axios from 'axios';

const BASE_URL = 'https://pruebareactjs.test-class.com/Api/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (username, password) => {
    const response = await api.post('api/Authenticate/login', {
      username,
      password
    });
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await api.post('api/Authenticate/register', {
      username,
      email,
      password
    });
    return response.data;
  }
};

export const clienteService = {
  listado: async (identificacion, nombre, usuarioId) => {
    const response = await api.post('api/Cliente/Listado', {
      identificacion: identificacion || '',
      nombre: nombre || '',
      usuarioId
    });
    return response.data;
  },

  obtener: async (idCliente) => {
    const response = await api.get(`api/Cliente/Obtener/${idCliente}`);
    return response.data;
  },

  crear: async (clienteData) => {
    const response = await api.post('api/Cliente/Crear', clienteData);
    return response.data;
  },

  actualizar: async (clienteData) => {
    const response = await api.post('api/Cliente/Actualizar', clienteData);
    return response.data;
  },

  eliminar: async (idCliente) => {
    const response = await api.delete(`api/Cliente/Eliminar/${idCliente}`);
    return response.data;
  }
};

export const interesesService = {
  listado: async () => {
    const response = await api.get('api/Intereses/Listado');
    return response.data;
  }
};

export default api;
