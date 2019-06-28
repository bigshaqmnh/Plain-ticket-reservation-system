import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import HeaderContainer from './containers/header';
import MainContainer from './containers/main';
import AuthContainer from './containers/auth';
import AirplanesContainer from './containers/airplanes';
import AirportsContainer from './containers/airports';
import FlightsContainer from './containers/flights';
import NotFound from './containers/notFound';

class App extends React.PureComponent {
  render() {
    return (
      <Container>
        <HeaderContainer />

        <Switch>
          <Route exact path="/" component={MainContainer} />
          <Route exact path="/auth" component={AuthContainer} />
          <Route path="/airplanes" component={AirplanesContainer} />
          <Route path="/airports" component={AirportsContainer} />
          <Route path="/flights" component={FlightsContainer} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    );
  }
}

export default App;
