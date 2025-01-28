import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL

const axiosInstance = axios.create({ 
    baseURL: BASE_URL,
    withCredentials: true 
 });

const api_key = process.env.REACT_APP_AXIOS_API;


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {BASE_URL, axiosInstance}