import { getUserToken } from '../helpers/token';

const fetchData = async ({ url, needAuth, ...requestParams }) => {
  const params = needAuth
    ? { ...requestParams, headers: { ...requestParams.headers, Authorization: `Bearer ${getUserToken()}` } }
    : requestParams;

  const response = await fetch(url, params);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw Error('Unable to fetch data');
  }
};

export default fetchData;
