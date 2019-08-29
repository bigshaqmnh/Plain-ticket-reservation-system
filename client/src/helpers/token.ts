const tokenKey: string = 'token';

export const saveUserToken = (token: string): void => {
  localStorage.setItem(tokenKey, token);
};

export const deleteUserToken = (): void => {
  localStorage.removeItem(tokenKey);
};

export const getUserToken = (): string => localStorage.getItem(tokenKey);
