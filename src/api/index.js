import * as axios from 'axios';

import { baseUrl } from '../config/';
import { saveUserToken, deleteUserToken } from '../helpers';
import { apiMethod } from '../constants/apiMethods';

export default {
  logIn: userData => {
    axios({
      method: apiMethod.post,
      url: `${baseUrl}/auth/login`,
      data: {
        email: userData.email,
        password: userData.password
      }
    })
      .then(response => saveUserToken(response.data))
      .catch(error => console.log('Error: unable to log in.', error));
  },

  logOut: () => deleteUserToken()
};
