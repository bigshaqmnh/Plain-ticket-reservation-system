import * as React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import App from './app';

const history = createBrowserHistory();

render(
  <Router history={history}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </Router>,
  document.getElementById('root')
);
