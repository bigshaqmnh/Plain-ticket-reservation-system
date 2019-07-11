import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  getUserInfo: async () => await fetchData({ method: 'GET', url: `${config.baseUrl}/users/info` })
};
