import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  getAll: params =>
    fetchData({
      method: 'GET',
      needAuth: true,
      url: `${config.adminUrl}/airplanes`,
      params
    }),

  getById: ({ id }) =>
    fetchData({
      method: 'GET',
      needAuth: true,
      url: `${config.adminUrl}/airplanes/${id}`
    }),

  add: airplane =>
    fetchData({
      method: 'POST',
      needAuth: true,
      url: `${config.adminUrl}/airplanes`,
      data: airplane
    })
};
