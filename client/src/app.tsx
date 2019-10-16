import * as React from 'react';
import { Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import MainScreen from './screens/Main';
import FlightsFeed from './screens/FlightsFeed';
import FlightConfigurator from './screens/FlightConfigurator';

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
    <Route exact path={['/', '/main']} component={MainScreen}/>
    <Route exact path="/feed" component={FlightsFeed}/>
    <Route exact path="/configurator" component={FlightConfigurator}/>
  </Provider>;

export default App;
