import { combineReducers } from 'redux';

import main from './screens/Main/reducers';
import flightsFeed from './screens/FlightsFeed/reducers';

export default combineReducers({
  main,
  flightsFeed
});
