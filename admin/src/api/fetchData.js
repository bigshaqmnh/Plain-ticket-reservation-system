import axios from 'axios';

import { getUserToken } from '../helpers/token';

const api = axios.create({
  timeout: 3000
});

const fetchData = ({ needAuth, ...requestParams }) =>
  api(
    needAuth
      ? { ...requestParams, headers: { ...requestParams.headers, Authorization: `Bearer ${getUserToken()}` } }
      : requestParams
  );

export default fetchData;
