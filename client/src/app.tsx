import * as React from 'react';
import { Container } from '@material-ui/core';
import * as Route from 'react-router-dom/Route';

import MainScreen from './screens/main';

function App() {
  return (
    <Container>
      <Route exact path={['/', '/main']} component={MainScreen} />
    </Container>
  );
}

export default App;
