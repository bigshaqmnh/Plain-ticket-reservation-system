import * as axios from 'axios';

import * as config from '../config/config.json';
import { getUserToken, saveUserToken, deleteUserToken } from '../helpers/token';

const fetchData = async ({ needAuth, ...requestParams }) => {
  try {
    const response = await axios(
      needAuth
        ? { ...requestParams, headers: { ...requestParams.headers, Authorization: `Bearer ${getUserToken()}` } }
        : requestParams
    );

    return response.data;
  } catch (err) {
    console.error('Error: unable to fetch data.', err);
    throw err;
  }
};

export const authApi = {
  logIn: async userData => {
    const token = await fetchData({ method: 'POST', url: `${config.baseUrl}/auth/login`, data: userData });

    saveUserToken(token);
  },

  logOut: () => deleteUserToken()
};

export const airplaneApi = {
  getAirplanes: params =>
    fetchData({
      method: 'GET',
      needAuth: true,
      url: `${config.adminUrl}/airplanes`,
      params
    }),

  addAirplane: airplane =>
    fetchData({
      method: 'POST',
      needAuth: true,
      url: `${config.adminUrl}/airplanes`,
      data: airplane
    })
};
