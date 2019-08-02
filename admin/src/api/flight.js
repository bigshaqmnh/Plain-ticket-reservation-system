import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  getAll: params =>
    fetchData({
      method: 'GET',
      needAuth: true,
      url: `${config.adminUrl}/flights`,
      params
    }),

  getById: ({ id }) =>
    fetchData({
      method: 'GET',
      needAuth: true,
      url: `${config.adminUrl}/flights/${id}`
    }),

  add: flight =>
    fetchData({
      method: 'POST',
      needAuth: true,
      url: `${config.adminUrl}/flights`,
      data: flight
    }),

  update: async (flight, flightId) =>
    fetchData({
      method: 'PUT',
      needAuth: true,
      url: `${config.adminUrl}/flights/${flightId}`,
      data: flight
    })
};
