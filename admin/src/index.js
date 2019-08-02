import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import history from './history';
import App from './app';

import './styles/main.scss';

render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
