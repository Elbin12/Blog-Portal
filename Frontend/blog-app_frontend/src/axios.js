import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL

const axiosInstance = axios.create({ 
    baseURL: BASE_URL,
    withCredentials: true 
 });

const api_key = process.env.REACT_APP_AXIOS_API;

export {BASE_URL, axiosInstance, api_key}