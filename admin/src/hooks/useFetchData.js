/* eslint-disable */

import { useState, useEffect } from 'react';

function useFetchData(apiMethod) {
  const [items, setItems] = useState([]);

  // const [page, setPage] = useState({current: 1, next: 1});

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [searchText, setSearchText] = useState('');

  const fetchData = async params => {
    try {
      const { data, count } = await apiMethod(params);

      setItems(data);
      // setPage({ current: nextPage - 1 || 1, next: nextPage || 1, total: Math.ceil(count / 10) });
      setMaxPage(Math.ceil(count / 10));
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData({ page: currentPage, query: searchText });
  }, [searchText, currentPage]);

  return { data: items, setItems, isLoading, searchText, setSearchText, currentPage, setCurrentPage, maxPage };
}

export default useFetchData;
