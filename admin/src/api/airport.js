import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  getAirports: params =>
    fetchData({
      method: 'GET',
      needAuth: true,
      url: `${config.adminUrl}/airports`,
      params
    }),

  addAirport: airport =>
    fetchData({
      method: 'POST',
      needAuth: true,
      url: `${config.adminUrl}/airports`,
      data: airport
    })
};
