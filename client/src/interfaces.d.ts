import { Moment } from 'moment';
import { IMainState } from './screens/Main/interfaces';
import { IFlightsFeedState } from './screens/FlightsFeed/interfaces';

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
  numberOfPassengers: number;
  page?: number;
  limit?: number;
}

export interface IAirportData {
  [key: string]: IAirport[];
}

export interface IFlightData {
  data: IFlight[];
}

export interface IFlightState {
  forward?: IFlight[];
  backward?: IFlight[];
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IState {
  main: IMainState;
  flightsFeed: IFlightsFeedState;
}

export type IDispatch = (actionCreator: IAction) => void;
