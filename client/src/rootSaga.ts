import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import { fetchAirportsSaga, fetchForwardFlightsSaga, fetchBackwardFlightsSaga } from './screens/Main/sagas';
import {
  FETCH_AIRPORTS_REQUESTED,
  FETCH_BACKWARD_FLIGHTS_REQUESTED,
  FETCH_FORWARD_FLIGHTS_REQUESTED
} from './constants/actions/Main';

function* rootSaga() {
  yield all([
    yield takeEvery(FETCH_AIRPORTS_REQUESTED, fetchAirportsSaga),
    yield takeLatest(FETCH_FORWARD_FLIGHTS_REQUESTED, fetchForwardFlightsSaga),
    yield takeLatest(FETCH_BACKWARD_FLIGHTS_REQUESTED, fetchBackwardFlightsSaga)
  ]);
}

export default rootSaga;
