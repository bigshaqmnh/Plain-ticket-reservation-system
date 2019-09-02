import {
  SET_CHOSEN_FLIGHTS
} from '../../constants/actions/FlightsFeed';

export const setChosenFlights = (flightIds: number[]) => ({
  type: SET_CHOSEN_FLIGHTS,
  payload: flightIds
});
