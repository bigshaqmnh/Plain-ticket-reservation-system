import { IAirportData, IFlightState, IFlightFetchRequest } from './interfaces';

export const FETCH_AIRPORTS_REQUESTED = 'FETCH_AIRPORTS_REQUESTED';
export const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM';
export const FETCH_AIRPORTS_SUCCEEDED = 'FETCH_AIRPORTS_SUCCEEDED';
export const FETCH_AIRPORTS_FAILED = 'FETCH_AIRPORTS_FAILED';

export const FETCH_FORWARD_FLIGHTS_REQUESTED = 'FETCH_FORWARD_FLIGHTS_REQUESTED';
export const FETCH_FORWARD_FLIGHTS_SUCCEEDED = 'FETCH_FORWARD_FLIGHTS_SUCCEEDED';
export const FETCH_FORWARD_FLIGHTS_FAILED = 'FETCH_FORWARD_FLIGHTS_FAILED';

export const FETCH_BACKWARD_FLIGHTS_REQUESTED = 'FETCH_BACKWARD_FLIGHTS_REQUESTED';
export const FETCH_BACKWARD_FLIGHTS_SUCCEEDED = 'FETCH_BACKWARD_FLIGHTS_SUCCEEDED';
export const FETCH_BACKWARD_FLIGHTS_FAILED = 'FETCH_BACKWARD_FLIGHTS_FAILED';

export const fetchAirports = () => ({
  type: FETCH_AIRPORTS_REQUESTED
});

export const setSelectedItem = (item: number) => ({
  type: SET_SELECTED_ITEM,
  payload: item
});

export const fetchAirportsSuccess = (airports: IAirportData) => ({
  type: FETCH_AIRPORTS_SUCCEEDED,
  payload: airports
});

export const fetchAirportsFail = (error: Error) => ({
  type: FETCH_AIRPORTS_FAILED,
  payload: error
});

export const fetchForwardFlights = (params: IFlightFetchRequest) => ({
  type: FETCH_FORWARD_FLIGHTS_REQUESTED,
  payload: params
});

export const fetchForwardFlightsSuccess = (flights: IFlightState) => ({
  type: FETCH_FORWARD_FLIGHTS_SUCCEEDED,
  payload: flights
});

export const fetchForwardFlightsFail = (error: Error) => ({
  type: FETCH_FORWARD_FLIGHTS_FAILED,
  payload: error
});

export const fetchBackwardFlights = (params: IFlightFetchRequest) => ({
  type: FETCH_BACKWARD_FLIGHTS_REQUESTED,
  payload: params
});

export const fetchBackwardFlightsSuccess = (flights: IFlightState) => ({
  type: FETCH_BACKWARD_FLIGHTS_SUCCEEDED,
  payload: flights
});

export const fetchBackwardFlightsFail = (error: Error) => ({
  type: FETCH_BACKWARD_FLIGHTS_FAILED,
  payload: error
});
