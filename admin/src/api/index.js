import * as axios from 'axios';

import * as config from '../config/config.json';
import { getUserToken, saveUserToken, deleteUserToken } from '../helpers/token';

export const authApi = {
  logIn: async userData => {
    try {
      const token = await axios.post(`${config.baseUrl}/auth/login`, userData);

      saveUserToken(token.data);
    } catch (err) {
      console.error('Error: unable to log in.', err);
    }
  },

  logOut: () => deleteUserToken()
};

export const airplaneApi = {
  getAirplanes: async params => {
    try {
      const airplanes = await axios.get(`${config.baseUrl}/airplanes`, { params });

      return airplanes.data;
    } catch (err) {
      console.error('Error: unable to get airplanes.', err);
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
    }
  },

  updateAirplane: async airplane => {
    try {
      return await axios({
        method: 'PUT',
        Authorization: getUserToken(),
        url: `${config.baseUrl}/airplanes/${airplane.id}`,
        data: airplane
      });
    } catch (err) {
      console.error('Error: unable to update the airplane.', err);
    }
  }
};
