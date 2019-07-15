/* eslint-disable */
import axios from 'axios';

import { getUserToken, deleteUserToken } from '../helpers/token';

const fetchData = async ({ needAuth, ...requestParams }) => {
  try {
    const token = getUserToken();

    if (needAuth && !token) {
      return;
    }

    const { data } = await axios(
      needAuth
        ? { ...requestParams, headers: { ...requestParams.headers, Authorization: `Bearer ${getUserToken()}` } }
        : requestParams
    );

    return data;
  } catch (err) {
    if (err.response.status === 401) {
      deleteUserToken();
      window.location.href = '/auth';
    }
    console.error('Error: unable to fetch data.', err);
    throw err;
  }
};

export default fetchData;
