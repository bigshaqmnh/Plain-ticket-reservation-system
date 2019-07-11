import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, ...args }) => {
  <Route
    {...args}
    render={props => (user.isLoggedIn === true ? <Component {...props} /> : <Redirect to="/login" />)}
  />;
};

export default PrivateRoute;
