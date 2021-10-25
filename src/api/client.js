import axios from 'axios';

const apiClient = axios.create({
  baseURL: '',
  headers: { Accept: 'application/json' },
});

export default apiClient;
