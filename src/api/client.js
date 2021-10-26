import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.wheretheiss.at/v1/satellites/25544',
  headers: { Accept: 'application/json' },
});

export default apiClient;
