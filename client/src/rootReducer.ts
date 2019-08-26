import { combineReducers } from 'redux';

import { airports, flights } from './screens/Main/reducers';

export default combineReducers({
  airports,
  flights
});
