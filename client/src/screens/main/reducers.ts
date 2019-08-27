import {
  FETCH_AIRPORTS_REQUESTED,
  SET_SELECTED_ITEM,
  FETCH_AIRPORTS_SUCCEEDED,
  FETCH_AIRPORTS_FAILED,
  FETCH_FORWARD_FLIGHTS_REQUESTED,
  FETCH_FORWARD_FLIGHTS_SUCCEEDED,
  FETCH_FORWARD_FLIGHTS_FAILED,
  FETCH_BACKWARD_FLIGHTS_REQUESTED,
  FETCH_BACKWARD_FLIGHTS_SUCCEEDED,
  FETCH_BACKWARD_FLIGHTS_FAILED
} from './actions';

import { IAction, IInitialState } from '../../interfaces';

const initialState: IInitialState = {
  fetchParams: null,
  isFetching: true,
  data: {},
  selectedItem: null,
  error: null
};

export const airports = (state: IInitialState = initialState, action: IAction) => {
  switch (action.type) {
    case FETCH_AIRPORTS_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload
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

export const flights = (state: IInitialState = initialState, action: IAction) => {
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
        isFetching: false,
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
        isFetching: false,
        data: { ...state.data, ...action.payload }
      };
    case FETCH_BACKWARD_FLIGHTS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};
