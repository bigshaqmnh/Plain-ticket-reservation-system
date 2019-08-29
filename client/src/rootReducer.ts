import { combineReducers } from 'redux';

import { airports, flights } from './screens/Main/reducers';
import { flightsFeed } from './screens/FlightsFeed/reducers';

export default combineReducers({
  airports,
  flights,
  flightsFeed
});
