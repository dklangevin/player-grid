import { getQuery } from '@/utils/helpers';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.teams = {
  list: (query) => api.get(`teams${getQuery(query)}`).then((res) => res.data),
};

api.players = {
  list: () => api.get('players').then((res) => res.data),
};

export default api;
