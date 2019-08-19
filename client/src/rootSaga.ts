import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import { FETCH_AIRPORTS_REQUESTED, FETCH_FLIGHTS_REQUESTED } from './screens/Main/actions';

import { fetchAirportsSaga, fetchFlightsSaga } from './screens/Main/sagas';

function* rootSaga() {
  yield all([
    yield takeLatest(FETCH_AIRPORTS_REQUESTED, fetchAirportsSaga),
    yield takeEvery(FETCH_FLIGHTS_REQUESTED, fetchFlightsSaga)
  ]);
}

export default rootSaga;
