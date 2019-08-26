import { getUserToken } from '../helpers/token';

interface IFetchData {
  url: string;
  needAuth?: boolean;
  requestParams: any;
}

const fetchData = async ({ url, needAuth, requestParams }: IFetchData) => {
  const params: RequestInit = needAuth
    ? { ...requestParams, headers: { ...requestParams.headers, Authorization: `Bearer ${getUserToken()}` } }
    : requestParams;

  const response = await fetch(url, params);

  if (response.ok) {
    return await response.json();
  } else {
    throw Error('Unable to fetch data');
  }
};

export default fetchData;
