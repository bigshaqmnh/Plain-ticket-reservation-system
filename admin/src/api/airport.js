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
    }),

  searchAirports: query =>
    fetchData({
      method: 'GET',
      url: `${config.mapsSearchPlaceUrl}`,
      params: {
        key: MAPS_API_KEY,
        input: query,
        language: 'en'
      }
    }),

  getAirportDetails: placeId =>
    fetchData({
      method: 'GET',
      url: `${config.mapsPlaceDetailsUrl}`,
      params: {
        key: MAPS_API_KEY,
        placeid: placeId,
        language: 'en'
      }
    })
};
