import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  findByParams: (params: URLSearchParams) =>
    fetchData({
      url: `${config.baseUrl}/flights?${new URLSearchParams(params)}`,
      requestParams: {
        method: 'GET'
      }
    })
};
