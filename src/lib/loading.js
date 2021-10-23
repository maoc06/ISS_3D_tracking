import { useState } from 'react';
const { createContext, useContext } = require('react');

const navContext = createContext();

export function LoadingProvider({ children }) {
  const loading = useAppLoading();
  return <navContext.Provider value={loading}>{children}</navContext.Provider>;
}

export const useLoading = () => {
  return useContext(navContext);
};

function useAppLoading() {
  const [loading, setLoading] = useState(false);

  const navigate = (param) => {
    setLoading(param);
  };

  return { loading, navigate };
}
