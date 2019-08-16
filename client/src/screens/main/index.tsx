import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import MainScreenFormComponent from './components/MainScreenForm';

import './style.scss';

const MainScreen = (props): JSX.Element =>
  <Grid container className="container">
    <MainScreenFormComponent {...props} />
  </Grid>;

export default connect()(MainScreen);
