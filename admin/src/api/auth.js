import fetchData from './fetchData';
import * as config from '../config/config.json';
import { saveUserToken, deleteUserToken } from '../helpers/token';

export default {
  logIn: async userData => {
    const token = await fetchData({ method: 'POST', url: `${config.baseUrl}/auth/login`, data: userData });

    saveUserToken(token);
  },

  logOut: () => deleteUserToken()
};
