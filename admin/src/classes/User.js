import authApi from '../api/auth';
import userApi from '../api/user';
import { saveUserToken, getUserToken, deleteUserToken } from '../helpers/token';

class User {
  constructor() {
    this._username = null;
    this._isLoggedIn = false;
    this._token = getUserToken();
  }
  get username() {
    return this._username;
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  _getUserData = () => userApi.getUserInfo(this._token);

  async logIn(credentials = null) {
    if (credentials) {
      this._token = await authApi.logIn(credentials);
      saveUserToken(this._token);
    }

    if (!this._token) {
      return;
    }

    const user = await this._getUserData();

    this._username = user.username;
    this._isLoggedIn = true;
  }

  logOut() {
    this._token = null;
    deleteUserToken();
  }
}

export default User;
