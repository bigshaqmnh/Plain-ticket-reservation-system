import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainContainer from './containers/main';
import AuthContainer from './containers/auth';
import AirplanesContainer from './containers/airplanes';
import AirportsContainer from './containers/airports';
import FlightsContainer from './containers/flights';
import NotFound from './containers/notFound';

import PrivateRoute from './helpers/privateRoute';

function App() {
  return (
    <Switch>
      <Route exact path="/auth" component={AuthContainer} />
      <PrivateRoute exact path="/" component={MainContainer} />
      <PrivateRoute path="/airplanes" component={AirplanesContainer} />
      <PrivateRoute path="/airports" component={AirportsContainer} />
      <PrivateRoute path="/flights" component={FlightsContainer} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
