import axios from 'axios';

import * as config from '../config/config.json';
import { getUserToken } from '../helpers/token';

const api = axios.create({
  timeout: config.requestTimeout // 30 seconds timeout
});

const fetchData = ({ needAuth, ...requestParams }) =>
  api(
    needAuth
      ? { ...requestParams, headers: { ...requestParams.headers, Authorization: `Bearer ${getUserToken()}` } }
      : requestParams
  );

export default fetchData;
