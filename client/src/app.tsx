import * as React from 'react';
import Container from '@material-ui/core/Container';
import Route from 'react-router-dom/Route';

import MainScreen from './screens/main';

import './style.scss';

const App = (): JSX.Element =>
  <Container maxWidth={false} className="root-container" >
    <Route exact path={['/', '/main']} component={MainScreen} />
  </Container>;

export default App;
