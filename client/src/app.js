import React from 'react';
import { Container } from '@material-ui/core';
import { Route } from 'react-router-dom';

import MainScreen from './screens/main';

function App() {
  return (
    <Container>
      <Route exact path={['/', '/main']} component={MainScreen} />
    </Container>
  );
}

export default App;
