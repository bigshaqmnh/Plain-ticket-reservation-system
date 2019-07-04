import * as axios from 'axios';

import { getUserToken } from '../helpers/token';

const fetchData = async ({ needAuth, ...requestParams }) => {
  try {
    const response = await axios(
      needAuth
        ? { ...requestParams, headers: { ...requestParams.headers, Authorization: `Bearer ${getUserToken()}` } }
        : requestParams
    );

    return response.data;
  } catch (err) {
    console.error('Error: unable to fetch data.', err);
    throw err;
  }
};

export default fetchData;
