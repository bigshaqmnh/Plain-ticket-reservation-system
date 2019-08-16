export const FETCH_FLIGHTS_REQUESTED = 'FETCH_FLIGHTS_REQUESTED';
export const FETCH_FLIGHTS_SUCCEEDED = 'FETCH_FLIGHTS_SUCCEEDED';
export const FETCH_FLIGHTS_FAILED = 'FETCH_FLIGHTS_FAILED';

export const fetchFlights = (params: object) => ({
  type: FETCH_FLIGHTS_REQUESTED,
  payload: params
});

export const fetchFlightsSuccess = (flights: object[]) => ({
  type: FETCH_FLIGHTS_SUCCEEDED,
  payload: flights
});

export const fetchFlightsFail = (error: Error) => ({
  type: FETCH_FLIGHTS_FAILED,
  payload: error
});

