import {
  FETCH_AIRPORTS_REQUESTED,
  FETCH_AIRPORTS_SUCCEEDED,
  FETCH_AIRPORTS_FAILED,
  FETCH_FLIGHTS_REQUESTED,
  FETCH_FLIGHTS_SUCCEEDED,
  FETCH_FLIGHTS_FAILED
} from './actions';

import { IAirportAction, IFlightAction, IState } from './interface';

const initialState: IState = {
  fetchParams: null,
  isFetching: true,
  data: [],
  error: null
};

export const airports = (state: IState = initialState, action: IAirportAction) => {
  switch (action.type) {
    case FETCH_AIRPORTS_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_AIRPORTS_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    case FETCH_AIRPORTS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const flights = (state: IState = initialState, action: IFlightAction) => {
  switch (action.type) {
    case FETCH_FLIGHTS_REQUESTED:
      return {
        ...state,
        isFetching: true,
        fetchParams: action.payload
      };
    case FETCH_FLIGHTS_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    case FETCH_FLIGHTS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};
