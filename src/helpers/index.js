export const saveUserToken = token => {
  const currentUser = {
    token: token,
    createDate: new Date().getTime()
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
};

export const deleteUserToken = () => {
  localStorage.removeItem('currentUser');
};
