import React from 'react';
import { render, createPortal } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app';

import './styles/main.scss';

const rootDiv = document.getElementById('root');
const alertDiv = document.getElementById('alert');

render(
  <Router>
    <App />
  </Router>,
  rootDiv
);
