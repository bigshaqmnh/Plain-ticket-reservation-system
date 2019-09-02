import { IDispatch, IFlightState } from '../../interfaces';
import { History } from 'history';

export interface IFlightsFeedInitialState {
  chosenForwardFlight: number;
  chosenBackwardFlight: number;
}

export interface IFlightsFeedProps {
  readonly history: History;
  isLoading: boolean;
  flights: IFlightState;
  showBackwardFlights: boolean;
  setChosenFlights: (flightIds: number[]) => void;
  readonly dispatch: IDispatch;
}

export interface IFlightsFeedState {
  activeStep: number;
  chosenForwardFlight: number;
  chosenBackwardFlight: number;
}
