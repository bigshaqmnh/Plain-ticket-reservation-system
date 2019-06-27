import * as axios from 'axios';

import * as config from '../config/config.json';
import { saveUserToken, deleteUserToken } from '../helpers/token';

export default {
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
