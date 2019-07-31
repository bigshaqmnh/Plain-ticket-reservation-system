import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  getInfo: () => fetchData({ method: 'GET', needAuth: true, url: `${config.baseUrl}/users/info` }),
  update: user => fetchData({ method: 'PUT', needAuth: true, url: `${config.baseUrl}/users`, data: user })
};
