import { combineReducers } from 'redux';

import { IAction } from '../../interfaces';
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
import { IMainInitialState } from './interfaces';

const initialState: IMainInitialState = {
  fetchParams: null,
  isFetching: true,
  data: {},
  selectedAirport: null,
  needBackwardTicket: false,
  error: null
};

const airports = (state: IMainInitialState = initialState, action: IAction) => {
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
    case SET_SELECTED_AIRPORT:
      return {
        ...state,
        selectedAirport: action.payload
      };
    default:
      return state;
  }
};

const flights = (state: IMainInitialState = initialState, action: IAction) => {
  switch (action.type) {
    case FETCH_FORWARD_FLIGHTS_REQUESTED:
      return {
        ...state,
        isFetching: true,
        fetchParams: action.payload
      };
    case FETCH_FORWARD_FLIGHTS_SUCCEEDED:
      return {
        ...state,
        isFetching: state.needBackwardTicket ? !(!!state.data.backward) : false,
        data: { ...state.data, ...action.payload }
      };
    case FETCH_FORWARD_FLIGHTS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case FETCH_BACKWARD_FLIGHTS_REQUESTED:
      return {
        ...state,
        isFetching: true,
        fetchParams: action.payload
      };
    case FETCH_BACKWARD_FLIGHTS_SUCCEEDED:
      return {
        ...state,
        isFetching: !(!!state.data.forward),
        data: { ...state.data, ...action.payload }
      };
    case FETCH_BACKWARD_FLIGHTS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case SET_NEED_BACKWARD_TICKET:
      return {
        ...state,
        needBackwardTicket: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({ airports, flights });
