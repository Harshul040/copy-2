import axios from 'axios';

const axiosInstance = axios.create({
 baseURL: 'https://copy-2-5.onrender.com/api',
   withCredentials: true,  //proxy to http://localhost:8800/api
});

export default axiosInstance;
