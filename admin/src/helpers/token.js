const tokenKey = 'token';

export const saveUserToken = token => {
  localStorage.setItem(tokenKey, token);
};

export const deleteUserToken = () => {
  localStorage.removeItem(tokenKey);
};

export const getUserToken = () => localStorage.getItem(tokenKey);
