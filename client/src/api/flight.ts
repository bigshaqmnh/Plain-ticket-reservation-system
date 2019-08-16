import fetchData from './fetchData';
import * as config from '../config/config.json';
import { Moment } from 'moment';

interface IParams {
  depCity: string;
  depCountry: string;
  arrCity: string;
  arrCountry: string;
  flyOut: Moment;
  flyBack: Moment;
  ammountOfPassengers: number;
}

export default {
  findByParams: (params: IParams) =>
    fetchData({
      method: 'GET',
      url: `${config.adminUrl}/flights`,
      params
    })
};
