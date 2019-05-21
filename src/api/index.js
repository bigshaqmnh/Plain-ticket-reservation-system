import * as axios from 'axios';

import * as config from '../config/config.json';
import { saveUserToken, deleteUserToken } from '../helpers';

export default {
  logIn: userData => {
    axios({
      method: 'POST',
      url: `${config.baseUrl}/auth/login`,
      data: {
        email: userData.email,
        password: userData.password
      }
    })
      .then(response => saveUserToken(response.data))
      .catch(error => console.error('Error: unable to log in.', error));
  },

  logOut: () => deleteUserToken()
};
