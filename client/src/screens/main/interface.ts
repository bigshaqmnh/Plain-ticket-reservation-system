import { Moment } from 'moment';

export interface IFlightData {
  data: IFlight[];
  count: number;
}

export interface IAirport {
  id: number;
  name: string;
  country?: string;
  city?: string;
}

export interface IAirplane {
  id: number;
  name: string;
  type?: string;
  maxLuggageCarryWeight?: number;
}

export interface IFlight {
  id: number;
  departureTime: Moment;
  arrivalTime: Moment;
  luggageOverweightCost: string;
  isCancelled: boolean;
  airplaneId: number;
  departureAirport: IAirport;
  arrivalAirport: IAirport;
  airplane: IAirplane;
}

export interface IFlightFetchRequest {
  depCountry: string;
  depCity: string;
  arrCountry: string;
  arrCity: string;
  departureTime: string;
  amountOfPassengers: number;
  page?: number;
  limit?: number;
}

export interface IAirportData {
  [key: string]: IAirport[];
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IState {
  fetchParams?: IFlightFetchRequest;
  isFetching: boolean;
  data: IAirport[];
  selectedItem?: number;
  error: Error;
}
