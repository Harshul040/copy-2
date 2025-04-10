import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8800/api',
   withCredentials: true,  //proxy to http://localhost:8800/api
});

export default axiosInstance;