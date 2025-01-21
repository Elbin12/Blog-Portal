import axios from 'axios';
import { store } from './redux/store';
import { setWorkerinfo } from './redux/worker';
import { setUserinfo } from './redux/user';

const BASE_URL = process.env.REACT_APP_API_URL

const api = axios.create({ 
    baseURL: BASE_URL,
    withCredentials: true 
 });

const api_key = process.env.REACT_APP_AXIOS_API;

export {BASE_URL, api, api_key}