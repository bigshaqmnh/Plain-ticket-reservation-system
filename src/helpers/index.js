export const saveUserToken = token => {
  localStorage.setItem('token', token);
};

export const deleteUserToken = () => {
  localStorage.removeItem('token');
};
