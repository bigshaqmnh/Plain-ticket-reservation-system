import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  getAirplanes: params =>
    fetchData({
      method: 'GET',
      needAuth: true,
      url: `${config.adminUrl}/airplanes`,
      params
    }),

  getAirplane: ({ airplaneId }) =>
    fetchData({
      method: 'GET',
      needAuth: true,
      url: `${config.adminUrl}/airplanes/${airplaneId}`
    }),

  addAirplane: airplane =>
    fetchData({
      method: 'POST',
      needAuth: true,
      url: `${config.adminUrl}/airplanes`,
      data: airplane
    })
};
