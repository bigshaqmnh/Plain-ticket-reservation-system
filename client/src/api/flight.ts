import fetchData from './fetchData';
import * as config from '../config/config.json';

export default {
  findByParams: (params: BodyInit) =>
    fetchData({
      url: `${config.baseUrl}/flights`,
      requestParams: {
        method: 'GET',
        body: params
      }
    })
};
