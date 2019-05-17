import * as axios from 'axios';
import { baseUrl } from '../config/config.json';
import { saveUserToken, deleteUserToken } from '../helpers';

export default {
  logIn: userData => {
    axios({
      method: 'post',
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
