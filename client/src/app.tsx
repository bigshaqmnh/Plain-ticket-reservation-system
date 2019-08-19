import * as React from 'react';
import { Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import MainScreen from './screens/Main';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

import './style.scss';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const App = (): JSX.Element =>
  <Provider store={store}>
    <Route exact path={['/', '/main']} component={MainScreen} />
  </Provider>;

export default App;
