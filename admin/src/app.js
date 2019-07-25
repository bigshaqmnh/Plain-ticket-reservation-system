import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import MainContainer from './containers/main';
import AuthContainer from './containers/auth';
import AirplanesContainer from './containers/airplanes';
import AirportsContainer from './containers/airports';
import FlightsContainer from './containers/flights';
import AccountContainer from './containers/account';
import NotFound from './containers/notFound';

import { withUserContext } from './context/user';

import PrivateRoute from './helpers/privateRoute';

function App() {
  return (
    <Container>
      <Switch>
        <Route exact path="/auth" component={AuthContainer} />
        <PrivateRoute exact path={['/', '/home']} component={MainContainer} />
        <PrivateRoute path="/airplanes" component={AirplanesContainer} />
        <PrivateRoute path="/airports" component={AirportsContainer} />
        <PrivateRoute path="/flights" component={FlightsContainer} />
        <PrivateRoute path="/account" component={AccountContainer} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
}

export default withUserContext(App);
