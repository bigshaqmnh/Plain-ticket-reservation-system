import React, { createContext, useState, useEffect } from 'react';

import useFetchData from '../hooks/useFetchData';
import userApi from '../api/user';

export const UserContext = createContext(null);

export const withUserContext = Component => () => {
  const { data: user, isLoading } = useFetchData({ apiMethod: userApi.getInfo });

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    !isLoading && setUserInfo(user);
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user: userInfo, updateUser: setUserInfo }}>
      <Component />
    </UserContext.Provider>
  );
};