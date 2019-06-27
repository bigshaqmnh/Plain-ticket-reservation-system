import * as axios from 'axios';

import * as config from '../config/config.json';
import { getUserToken } from '../helpers/token';

export default {
  getFlights: async params => {
    try {
      const flights = await axios.get(`${config.baseUrl}/flights`, { params });

      return flights.data;
    } catch (err) {
      console.error('Error: unable to get flights.', err);
      throw err;
    }
  },

  addFlight: async flight => {
    try {
      return await axios({
        method: 'POST',
        Authorization: getUserToken(),
        url: `${config.baseUrl}/flights`,
        data: flight
      });
    } catch (err) {
      console.error('Error: unable to add new flight.', err);
      throw err;
    }
  },

  updateFlight: async flight => {
    try {
      return await axios({
        method: 'PUT',
        Authorization: getUserToken(),
        url: `${config.baseUrl}/flights/${flight.id}`,
        data: flight
      });
    } catch (err) {
      console.error('Error: unable to update the flight.', err);
      throw err;
    }
  }
};
