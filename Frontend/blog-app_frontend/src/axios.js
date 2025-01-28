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

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
      if (error.response && error.response.status === 401) {
        try{
          const refreshToken = localStorage.getItem("refresh_token");

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const { data } = await axiosInstance.post("api/token/refresh/", {
            refresh: refreshToken,
          });

          localStorage.setItem("access_token", data.access);

          error.config.headers["Authorization"] = `Bearer ${data.access}`;
          return axiosInstance.request(error.config);
        }catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
  }
);

export {BASE_URL, axiosInstance}