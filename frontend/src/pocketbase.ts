import axios, { InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// Funktion zum Abrufen des Auth-Tokens
const getAuthToken = () => {
  const auth = localStorage.getItem('pocketbase_auth');
  if (auth) {
    const { token } = JSON.parse(auth);
    return token;
  }
  return null;
};

// Verwende immer den relativen Pfad für API-Anfragen
const api = axios.create({
  baseURL: '/api'
});

// Request Interceptor für Auth-Token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAuthToken();
  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;