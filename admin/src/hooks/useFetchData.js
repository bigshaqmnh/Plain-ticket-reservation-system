import { useState, useEffect } from 'react';

function useFetchData(apiMethod, customParams) {
  const [items, setItems] = useState(null);
  const [itemsCount, setItemsCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [searchText, setSearchText] = useState('');

  const fetchData = async params => {
    try {
      const response = await apiMethod(params);

      if (!response) {
        setIsLoading(false);
        return;
      }

      setItems(response.data);
      setItemsCount(response.count);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
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
