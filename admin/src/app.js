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
import CustomAlert from './components/customAlert';

import { withUserContext } from './context/user';
import { withAlertContext } from './context/alert';

import PrivateRoute from './helpers/privateRoute';

import combineContexts from './helpers/combineContext';

function App() {
  return (
    <Container>
      <Switch>
        <Route exact path="/auth" component={AuthContainer} />
        <PrivateRoute exact path={['/', '/home']} component={MainContainer} />
        <PrivateRoute exact path="/airplanes" component={AirplanesContainer} />
        <PrivateRoute exact path={['/airplanes/:id/details', '/airplanes/add']} component={AirplaneForm} />
        <PrivateRoute exact path="/airports" component={AirportsContainer} />
        <PrivateRoute exact path={['/airports/:id/details', '/airports/add']} component={AirportForm} />
        <PrivateRoute exact path="/flights" component={FlightsContainer} />
        <PrivateRoute
          exact
          path={['/flights/:id/details', '/flights/add', '/flights/:id/edit']}
          component={FlightForm}
        />
        <PrivateRoute exact path={['/account/details', '/account/edit']} component={AccountContainer} />
        <Route component={NotFound} />
      </Switch>
      <CustomAlert />
    </Container>
  );
}

export default combineContexts(withAlertContext, withUserContext)(App);
