import { useState, useEffect } from 'react';

import { resultsPerPageLimit } from '../constants/common';

function useFetchData(apiMethod) {
  const [items, setItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async params => {
      try {
        const { data, count } = await apiMethod(params);

        setItems(data);
        setMaxPage(Math.ceil(count / resultsPerPageLimit));
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData({ page: currentPage, query: searchText });
  }, [searchText, currentPage]);

  return { items, setItems, isLoading, searchText, setSearchText, currentPage, setCurrentPage, maxPage };
}

export default useFetchData;
