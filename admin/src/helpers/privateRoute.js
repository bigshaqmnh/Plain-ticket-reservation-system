import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import HeaderContainer from '../containers/header';

import { getUserToken } from './token';

const PrivateRoute = ({ component: Component, ...args }) => (
  <Route
    {...args}
    render={props =>
      getUserToken() ? (
        <>
          <HeaderContainer /> <Component {...props} />
        </>
      ) : (
        <Redirect to="/auth" />
      )
    }
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.func
};

PrivateRoute.defaultProps = {
  component: null
};

export default PrivateRoute;
