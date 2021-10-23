import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://api.open-notify.org/',
  headers: { Accept: 'application/json' },
});

export default apiClient;
