import { FETCH_FLIGHTS_REQUESTED, FETCH_FLIGHTS_SUCCEEDED, FETCH_FLIGHTS_FAILED } from './actions';

interface IInitialState {
  fetchParams: object;
  isFetching: boolean;
  flights: object[];
  error: Error;
}

interface IFlightAction {
  type: string;
  payload: object | object[] | Error;
}

const initialState: IInitialState = {
  fetchParams: {},
  isFetching: false,
  flights: [],
  error: null
};

const flights = (state: IInitialState = initialState, action: IFlightAction) => {
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
        flights: action.payload
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

export default flights;
