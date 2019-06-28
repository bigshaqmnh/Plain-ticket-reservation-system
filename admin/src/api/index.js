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
      throw err;
    }
  },

  logOut: () => deleteUserToken()
};

export const airplaneApi = {
  getAirplanes: async params => {
    try {
      const token = getUserToken();
      const airplanes = await axios({
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.adminUrl}/airplanes`,
        params
      });

      return airplanes.data;
    } catch (err) {
      console.error('Error: unable to get airplanes.', err);
      throw err;
    }
  },

  addAirplane: async airplane => {
    try {
      const token = getUserToken();

      const newAirplane = await axios({
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.adminUrl}/airplanes`,
        data: airplane
      });

      return newAirplane.data;
    } catch (err) {
      console.error('Error: unable to add new airplane.', err);
      throw err;
    }
  },

  updateAirplane: async airplane => {
    try {
      const token = getUserToken();

      const updatedAirplane = await axios({
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.adminUrl}/airplanes/${airplane.id}`,
        data: airplane
      });

      return updatedAirplane.data;
    } catch (err) {
      console.error('Error: unable to update the airplane.', err);
      throw err;
    }
  }
};
