import { IAction } from '../../interfaces';
import {
  SET_CHOSEN_FLIGHTS
} from '../../constants/actions/FlightsFeed';
import { IFlightsFeedInitialState } from './interfaces';

const initialState: IFlightsFeedInitialState = {
  chosenForwardFlight: null,
  chosenBackwardFlight: null
};

const flightsFeed = (state: IFlightsFeedInitialState = initialState, action: IAction) => {
  if (action.type === SET_CHOSEN_FLIGHTS) {
    return {
      chosenForwardFlight: action.payload[0],
      chosenBackwardFlight: action.payload[1]
    };
  } else {
    return state;
  }
};

export default flightsFeed;
