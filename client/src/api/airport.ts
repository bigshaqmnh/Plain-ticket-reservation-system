import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  getAll: () =>
    fetchData({
      url: `${config.baseUrl}/airports?groupBy=country`,
      requestParams: {
        method: 'GET'
      }
    })
};
