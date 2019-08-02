import { useState, useEffect } from 'react';

import { deleteUserToken } from '../helpers/token';
import logger from '../helpers/logger';

import componentStyles from '../constants/componentStyles';

import history from '../history';

const redirectToLogIn = () => {
  deleteUserToken();
  history.replace('/auth');
};

function useFetchData(apiMethod, setAlert, setShowAlert, customParams, needFetch = true) {
  const [data, setData] = useState(null);
  const [dataCount, setDataCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [searchText, setSearchText] = useState('');

  const fetchData = async params => {
    try {
      const { data } = await apiMethod(params);

      setData(data.data);
      setDataCount(data.count);
      setIsLoading(false);
    } catch (err) {
      logger(err);

      if (err.response && err.response.status === 401) {
        setAlert({
          variant: componentStyles.error,
          heading: 'Authorization Error',
          mainText: 'Failed to authorize. Try to log in again.',
          disableAutoClose: true
        });

        redirectToLogIn();
      } else {
        setAlert({
          variant: componentStyles.error,
          heading: 'Network Error',
          mainText: 'Failed to fetch data. Try again later',
          disableAutoClose: true
        });
      }

      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (!needFetch) {
      setIsLoading(false);
    } else {
      const params = searchText ? { ...customParams, query: searchText } : { ...customParams, page: currentPage };
      setIsLoading(true);

      fetchData(params);
    }
  }, [searchText, currentPage]);

  const handleSearch = ({ target }) => {
    setSearchText(target.value);
  };

  return { data, dataCount, isLoading, searchText, currentPage, setCurrentPage, handleSearch };
}

export default useFetchData;
