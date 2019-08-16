import { call, put } from 'redux-saga/effects';

import { fetchFlightsSuccess, fetchFlightsFail } from './actions';
import api from '../../api/flight';

function* fetchFlightsSaga(action) {
  console.log('saga action: ', action);
  try {
    const flights = yield call(api.findByParams, action.payload);
    console.log('fetched flights: ', flights);
    yield put(fetchFlightsSuccess(flights));
  } catch (err) {
    yield put(fetchFlightsFail(err));
  }
}

export default fetchFlightsSaga;
