import { IDispatch } from '../../interfaces';
import { History } from 'history';

export interface IFlightConfiguratorProps {
  readonly history: History;
  flightIds: number[];
  readonly dispatch: IDispatch;
}
