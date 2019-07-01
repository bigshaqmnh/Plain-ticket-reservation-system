import * as axios from 'axios';

import * as config from '../config/config.json';
import { getUserToken } from '../helpers/token';

export default {
  getFlights: async params => {
    try {
      const token = getUserToken();
      const flights = await axios.get(`${config.adminUrl}/flights`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      });

      return flights.data;
    } catch (err) {
      console.error('Error: unable to get flights.', err);
      throw err;
    }
  },

  addFlight: async flight => {
    try {
      const token = getUserToken();
      return await axios.post(`${config.adminUrl}/flights`, {
        headers: { Authorization: `Bearer ${token}` },
        data: flight
      });
    } catch (err) {
      console.error('Error: unable to add new flight.', err);
      throw err;
    }
  },

  updateFlight: async flight => {
    try {
      const token = getUserToken();
      return await axios.put(`${config.adminUrl}/flights/${flight.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: flight
      });
    } catch (err) {
      console.error('Error: unable to update the flight.', err);
      throw err;
    }
  }
};
