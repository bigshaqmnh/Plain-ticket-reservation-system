import { Moment } from 'moment';

import { IFlightFetchRequest } from '../../../../interfaces';

export interface IFormValues {
  from: string;
  to: string;
  flyOut: Moment;
  flyBack: Moment;
  numberOfPassengers: number;
  twoWays: boolean;
}

export interface IFormProps {
  from?: string;
  to?: string;
  flyOut?: Moment;
  flyBack?: Moment;
  numberOfPassengers?: number;
  twoWays?: boolean;
  fetchForwardFlights: (params: IFlightFetchRequest) => void;
  fetchBackwardFlights: (params: IFlightFetchRequest) => void;
  changePage: () => void;
  locations: string[];
}

export interface IValidationErrors {
  from?: string;
  to?: string;
  numberOfPassengers?: string;
}
