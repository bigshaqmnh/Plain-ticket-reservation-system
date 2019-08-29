import {
  SET_ACTIVE_STEP
} from '../../constants/actions/FlightsFeed';

export const setActiveStep = (step: number) => ({
  type: SET_ACTIVE_STEP,
  payload: step
});
