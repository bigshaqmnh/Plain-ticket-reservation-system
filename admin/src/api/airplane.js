import * as axios from 'axios';

import * as config from '../config/config.json';
import { getUserToken } from '../helpers/token';

export default {
  getAirplanes: async params => {
    try {
      const airplanes = await axios.get(`${config.baseUrl}/airplanes`, { params });

      return airplanes.data;
    } catch (err) {
      console.error('Error: unable to get airplanes.', err);
      throw err;
    }
  },

  addAirplane: async airplane => {
    try {
      return await axios({
        method: 'POST',
        Authorization: getUserToken(),
        url: `${config.baseUrl}/airplanes`,
        data: airplane
      });
    } catch (err) {
      console.error('Error: unable to add new airplane.', err);
      throw err;
    }
  }
};
