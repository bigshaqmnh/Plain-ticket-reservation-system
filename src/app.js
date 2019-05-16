import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import HeaderContainer from './containers/header';
import MainContainer from './containers/main';
import AuthContainer from './containers/auth';
import AirplanesContainer from './containers/airplanes';
import AirportsContainer from './containers/airports';
import FlightsContainer from './containers/flights';

class App extends React.PureComponent {
  render() {
    return (
      <Container>
        <HeaderContainer />

        <Route exact path="/" component={MainContainer} />
        <Route path="/auth" component={AuthContainer} />
        <Route path="/airplanes" component={AirplanesContainer} />
        <Route path="/airports" component={AirportsContainer} />
        <Route path="/flights" component={FlightsContainer} />
      </Container>
    );
  }
}

export default App;
