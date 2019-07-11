import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  logIn: async userData => await fetchData({ method: 'POST', url: `${config.baseUrl}/auth/login`, data: userData })
};
