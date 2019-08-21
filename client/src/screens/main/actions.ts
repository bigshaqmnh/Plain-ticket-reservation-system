import { IAirportData, IFlight, IFlightFetchRequest } from './interface';

export const FETCH_AIRPORTS_REQUESTED = 'FETCH_AIRPORTS_REQUESTED';
export const FETCH_AIRPORTS_SUCCEEDED = 'FETCH_AIRPORTS_SUCCEEDED';
export const FETCH_AIRPORTS_FAILED = 'FETCH_AIRPORTS_FAILED';

export const FETCH_FLIGHTS_REQUESTED = 'FETCH_FLIGHTS_REQUESTED';
export const FETCH_FLIGHTS_SUCCEEDED = 'FETCH_FLIGHTS_SUCCEEDED';
export const FETCH_FLIGHTS_FAILED = 'FETCH_FLIGHTS_FAILED';

export const fetchAirports = () => ({
  type: FETCH_AIRPORTS_REQUESTED
});

export const fetchAirportsSuccess = (airports: IAirportData) => ({
  type: FETCH_AIRPORTS_SUCCEEDED,
  payload: airports
});

export const fetchAirportsFail = (error: Error) => ({
  type: FETCH_AIRPORTS_FAILED,
  payload: error
});

export const fetchFlights = (params: IFlightFetchRequest) => ({
  type: FETCH_FLIGHTS_REQUESTED,
  payload: params
});

export const fetchFlightsSuccess = (flights: IFlight[]) => ({
  type: FETCH_FLIGHTS_SUCCEEDED,
  payload: flights
});

export const fetchFlightsFail = (error: Error) => ({
  type: FETCH_FLIGHTS_FAILED,
  payload: error
});
