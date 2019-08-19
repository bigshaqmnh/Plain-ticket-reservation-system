import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  getAll: params =>
    fetchData({
      method: 'GET',
      url: `${config.baseUrl}/airports`,
      params
    }),

  getById: ({ id }) =>
    fetchData({
      method: 'GET',
      needAuth: true,
      url: `${config.adminUrl}/airports/${id}`
    }),

  add: airport =>
    fetchData({
      method: 'POST',
      needAuth: true,
      url: `${config.adminUrl}/airports`,
      data: airport
    })
};
