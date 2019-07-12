import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  logIn: userData => fetchData({ method: 'POST', url: `${config.baseUrl}/auth/login`, data: userData })
};
