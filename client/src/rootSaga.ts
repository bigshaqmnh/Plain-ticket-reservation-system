import { all, takeLatest } from 'redux-saga/effects';

import fetchFlightsSaga from './screens/main/sagas';

function* rootSaga() {
  yield all([
    yield takeLatest('FLIGHTS_FETCH_REQUESTED', fetchFlightsSaga)
  ]);
}

export default rootSaga;
