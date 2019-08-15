import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  findByParams: params =>
    fetchData({
      method: 'GET',
      url: `${config.adminUrl}/flights`,
      params
    })
};
