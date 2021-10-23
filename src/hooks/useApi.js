import { useState } from 'react';

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    let response;
    setLoading(true);
    try {
      response = await apiFunc(...args);
      setData(response.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);

    return response;
  };

  return { data, error, loading, request };
};

export default useApi;
