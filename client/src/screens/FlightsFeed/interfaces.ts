import { IFlightState } from '../../interfaces';

export interface IFlightsFeedInitialState {
  activeStep: number;
}

export interface IFlightsFeedState {
  isLoading: boolean;
  flights: IFlightState;
  activeStep: number;
}
