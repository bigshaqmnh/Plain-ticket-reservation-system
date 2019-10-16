import { IAirportData, IFlightFetchRequest, IFlightState } from '../../interfaces';

export interface IMainInitialState {
  fetchParams?: IFlightFetchRequest;
  isFetching: boolean;
  data: IAirportData | IFlightState;
  selectedAirport?: number;
  needBackwardTicket: boolean;
  error: Error;
}

export interface IMainState {
  airports: IMainInitialState;
  flights: IMainInitialState;
}
