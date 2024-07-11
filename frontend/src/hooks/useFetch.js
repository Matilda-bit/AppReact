import { useEffect, useState } from 'react';
import { fetchMemeTemplates } from '../http.js';
export function useFetch(initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchMemeTemplates();
        console.log(data);
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, []);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error
  }
}