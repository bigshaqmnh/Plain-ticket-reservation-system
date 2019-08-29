import { IAirportData, IFlightFetchRequest, IFlightState } from '../../interfaces';

export interface IMainInitialState {
  fetchParams?: IFlightFetchRequest;
  isFetching: boolean;
  data: IAirportData | IFlightState;
  selectedItem?: number;
  error: Error;
}

export interface IMainState {
  airports: IMainInitialState;
  flights: IMainInitialState;
}
