import { useState, useEffect } from 'react';

import { deleteUserToken } from '../helpers/token';
import logger from '../helpers/logger';

import componentStyles from '../constants/componentStyles';

const redirectToLogIn = () => {
  deleteUserToken();
  window.location.assign('/auth');
};

function useFetchData(apiMethod, setAlert, setShowAlert, customParams) {
  const [items, setItems] = useState(null);
  const [itemsCount, setItemsCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [searchText, setSearchText] = useState('');

  const fetchData = async params => {
    try {
      const { data } = await apiMethod(params);

      setItems(data.data);
      setItemsCount(data.count);
      setIsLoading(false);
    } catch (err) {
      logger(err);

      if (err.response && err.response.status === 401) {
        setAlert({
          variant: componentStyles.error,
          heading: 'Authorization Error',
          mainText: 'Failed to authorize. Try to log in again.',
          isShown: isShown => {
            setShowAlert(isShown);
            redirectToLogIn();
          },
          autoClose: false
        });
      } else {
        setAlert({
          variant: componentStyles.error,
          heading: 'Network Error',
          mainText: 'Failed to fetch data. Try again later',
          isShown: setShowAlert
        });
      }

      setShowAlert(true);
    }
  };

  useEffect(() => {
    const params = searchText ? { ...customParams, query: searchText } : { ...customParams, page: currentPage };
    setIsLoading(true);

    fetchData(params);
  }, [searchText, currentPage]);

  return { items, setItems, itemsCount, isLoading, searchText, setSearchText, currentPage, setCurrentPage };
}

export default useFetchData;
