import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  getFlights: params =>
    fetchData({
      method: 'GET',
      needAuth: true,
      url: `${config.adminUrl}/flights`,
      params
    }),

  getFlight: flightId =>
    fetchData({
      method: 'GET',
      needAuth: true,
      url: `${config.adminUrl}/flights/${flightId}`
    }),

  addFlight: flight =>
    fetchData({
      method: 'POST',
      needAuth: true,
      url: `${config.adminUrl}/flights`,
      data: flight
    }),

  updateFlight: async (flightId, flight) =>
    fetchData({
      method: 'PUT',
      needAuth: true,
      url: `${config.adminUrl}/flights/${flightId}`,
      data: flight
    })
};
