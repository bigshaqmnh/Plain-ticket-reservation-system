import { call, put } from 'redux-saga/effects';

import {
  fetchAirportsSuccess,
  fetchAirportsFail,
  fetchForwardFlightsSuccess,
  fetchForwardFlightsFail,
  fetchBackwardFlightsSuccess,
  fetchBackwardFlightsFail
} from './actionCreators';

import { IAction, IAirportData, IFlightData } from '../../interfaces';

import airportApi from '../../api/airport';
import flightApi from '../../api/flight';

export function* fetchAirportsSaga() {
  try {
    const airports: IAirportData = yield call(airportApi.getAll);
    yield put(fetchAirportsSuccess(airports));
  } catch (err) {
    yield put(fetchAirportsFail(err));
  }
}

export function* fetchForwardFlightsSaga(action: IAction) {
  try {
    const flights: IFlightData = yield call(flightApi.findByParams, action.payload);
    yield put(fetchForwardFlightsSuccess({ forward: flights.data }));
  } catch (err) {
    yield put(fetchForwardFlightsFail(err));
  }
}

export function* fetchBackwardFlightsSaga(action: IAction) {
  try {
    const flights: IFlightData = yield call(flightApi.findByParams, action.payload);
    yield put(fetchBackwardFlightsSuccess({ backward: flights.data }));
  } catch (err) {
    yield put(fetchBackwardFlightsFail(err));
  }
}
