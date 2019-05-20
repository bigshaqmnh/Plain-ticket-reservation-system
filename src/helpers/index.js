export const saveUserToken = token => {
  const userToken = token;
  localStorage.setItem('userToken', userToken);
};

export const deleteUserToken = () => {
  localStorage.removeItem('userToken');
};
