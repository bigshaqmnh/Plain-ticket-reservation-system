import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const withUserContext = Component => () => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{ user: userInfo, updateUser: setUserInfo }}>
      <Component />
    </UserContext.Provider>
  );
};
