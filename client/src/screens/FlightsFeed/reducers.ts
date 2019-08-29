import { IAction } from '../../interfaces';
import {
  SET_ACTIVE_STEP
} from '../../constants/actions/FlightsFeed';
import { IFlightsFeedInitialState } from './interfaces';

const initialState: IFlightsFeedInitialState = {
  activeStep: 0
};

export const flightsFeed = (state: IFlightsFeedInitialState = initialState, action: IAction) => {
  if (action.type === SET_ACTIVE_STEP) {
    return {
      activeStep: action.payload
    };
  } else {
    return state;
  }
};
