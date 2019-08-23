import {
  FETCH_AIRPORTS_REQUESTED,
  SET_SELECTED_ITEM,
  FETCH_AIRPORTS_SUCCEEDED,
  FETCH_AIRPORTS_FAILED,
  FETCH_FLIGHTS_REQUESTED,
  FETCH_FLIGHTS_SUCCEEDED,
  FETCH_FLIGHTS_FAILED
} from './actions';

import { IAction, IState } from './interface';

const initialState: IState = {
  fetchParams: null,
  isFetching: true,
  data: [],
  selectedItem: null,
  error: null
};

export const airports = (state: IState = initialState, action: IAction) => {
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

export const flights = (state: IState = initialState, action: IAction) => {
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
        data: [...state.data, action.payload]
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
