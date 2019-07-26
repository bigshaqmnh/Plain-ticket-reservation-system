import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import MainContainer from './containers/main';
import AuthContainer from './containers/auth';
import AirplanesContainer from './containers/airplanes';
import AirplaneForm from './containers/airplanes/AirplaneForm';
import AirportsContainer from './containers/airports';
import AirportForm from './containers/airports/AirportForm';
import FlightsContainer from './containers/flights';
import FlightForm from './containers/flights/FlightForm';
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
        <PrivateRoute exact path="/airplanes" component={AirplanesContainer} />
        <PrivateRoute exact path={['/airplanes/:airplaneId/details', '/airplanes/add']} component={AirplaneForm} />
        <PrivateRoute exact path="/airports" component={AirportsContainer} />
        <PrivateRoute exact path={['/airports/:airportId/details', '/airports/add']} component={AirportForm} />
        <PrivateRoute exact path="/flights" component={FlightsContainer} />
        <PrivateRoute exact path={['/flights/:flightId/details', '/flights/add']} component={FlightForm} />
        <PrivateRoute exact path="/account" component={AccountContainer} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
}

export default withUserContext(App);
