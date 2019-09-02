import { IAirportData, IFlightFetchRequest, IFlightState } from '../../interfaces';
import {
  FETCH_AIRPORTS_FAILED,
  FETCH_AIRPORTS_REQUESTED,
  FETCH_AIRPORTS_SUCCEEDED,
  FETCH_BACKWARD_FLIGHTS_FAILED,
  FETCH_BACKWARD_FLIGHTS_REQUESTED,
  FETCH_BACKWARD_FLIGHTS_SUCCEEDED,
  FETCH_FORWARD_FLIGHTS_FAILED,
  FETCH_FORWARD_FLIGHTS_REQUESTED,
  FETCH_FORWARD_FLIGHTS_SUCCEEDED,
  SET_SELECTED_AIRPORT,
  SET_NEED_BACKWARD_TICKET
} from '../../constants/actions/Main';

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

export const setSelectedAirport = (item: number) => ({
  type: SET_SELECTED_AIRPORT,
  payload: item
});

export const setNeedBackwardTicket = (isNeeded: boolean) => ({
  type: SET_NEED_BACKWARD_TICKET,
  payload: isNeeded
});
