import { call, put } from 'redux-saga/effects';

import {
  fetchAirportsSuccess,
  fetchAirportsFail,
  fetchFlightsSuccess,
  fetchFlightsFail
} from './actions';

import { IAirportAction, IFlightAction, IAirportData, IFlightData } from './interface';

import airportApi from '../../api/airport';
import flightApi from '../../api/flight';

export function* fetchAirportsSaga(action: IAirportAction) {
  try {
    const airports: IAirportData = yield call(airportApi.getAll);
    yield put(fetchAirportsSuccess(airports));
  } catch (err) {
    yield put(fetchAirportsFail(err));
  }
}

export function* fetchFlightsSaga(action: IFlightAction) {
  try {
    const flights: IFlightData = yield call(flightApi.findByParams, action.payload);
    yield put(fetchFlightsSuccess(flights.data));
  } catch (err) {
    yield put(fetchFlightsFail(err));
  }
}
