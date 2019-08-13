import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import MainScreenFormComponent from './components/MainScreenForm';

import './style.scss';

const MainScreen = (): JSX.Element =>
  <Grid container className="container">
    <MainScreenFormComponent />
  </Grid>;

export default MainScreen;
