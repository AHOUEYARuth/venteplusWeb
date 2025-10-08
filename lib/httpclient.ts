import axios from "axios";


const api = axios.create({
  baseURL: "https://api.monsite.com",
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = "";  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;