import axios from 'axios';

import * as config from '../config/config.json';
import { getUserToken } from '../helpers/token';

const api = axios.create({
  timeout: config.requestTimeout // 30 seconds timeout
});

const fetchData = async ({ needAuth, ...requestParams }) => {
  const userToken = getUserToken();

  if (needAuth && !userToken) {
    return {};
  }

  const response = await api(
    needAuth
      ? { ...requestParams, headers: { ...requestParams.headers, Authorization: `Bearer ${userToken}` } }
      : requestParams
  );

  return response;
};

export default fetchData;
