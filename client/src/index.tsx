import * as React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import App from './app';

import history from './history';

render(
  <Router history={history}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <App/>
    </MuiPickersUtilsProvider>
  </Router>,
  document.getElementById('root')
);
