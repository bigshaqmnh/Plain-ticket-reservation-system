import { getUserToken } from '../helpers/token';

interface IFetchData {
  url: string;
  needAuth?: boolean;
  requestParams: RequestInit;
}

const fetchData = async ({ url, needAuth, requestParams }: IFetchData) => {
  const params: RequestInit = needAuth
    ? { ...requestParams, headers: { ...requestParams.headers, Authorization: `Bearer ${getUserToken()}` } }
    : requestParams;

  const response: Response = await fetch(url, params);

  if (response.ok) {
    const data: object | object[] = await response.json();
    return data;
  } else {
    throw Error('Unable to fetch data');
  }
};

export default fetchData;
