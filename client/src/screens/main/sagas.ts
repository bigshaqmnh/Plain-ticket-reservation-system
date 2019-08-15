import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api/flight';

function* fetchFlights(action) {
  try {
    const flights = yield call(api.findByParams, action.payload);
    yield put({ type: "FLIGHTS_FETCH_SUCCEEDED", flights });
  } catch (e) {
    yield put({ type: "FLIGHTS_FETCH_FAILED", message: e.message });
  }
}

function* fetchFlightsSaga() {
  yield takeLatest("FLIGHTS_FETCH_REQUESTED", fetchFlights);
}

export default fetchFlightsSaga;
