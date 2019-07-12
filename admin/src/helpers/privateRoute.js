import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import userApi from '../api/user';
import useFetchData from '../hooks/useFetchData';

function PrivateRoute({ component: Component, ...args }) {
  const { items: user, isLoading } = useFetchData(userApi.getUserInfo);

  return (
    !isLoading && <Route {...args} render={props => (user ? <Component {...props} /> : <Redirect to="/auth" />)} />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func
};

PrivateRoute.defaultProps = {
  component: null
};

export default PrivateRoute;
