import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://dicio.com.br',
});

export default axiosClient;
