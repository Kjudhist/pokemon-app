import axios from "axios";

const API = axios.create();

API.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = import.meta.env.VITE_BASE_URL;
  return axiosConfig;
});

export default API;
