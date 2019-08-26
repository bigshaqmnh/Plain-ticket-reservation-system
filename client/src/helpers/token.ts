const tokenKey: string = 'token';

export const saveUserToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

export const deleteUserToken = () => {
  localStorage.removeItem(tokenKey);
};

export const getUserToken = () => localStorage.getItem(tokenKey);
