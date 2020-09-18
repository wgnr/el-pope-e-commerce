import React,
{
  createContext,
  useContext,
  useState,
} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const LoadingContext = createContext();

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return <LoadingContext.Provider value={{setIsLoading}}>
    {isLoading && <LinearProgress style={{
      position: 'absolute', width: "100%"
    }} />}
    {children}
  </LoadingContext.Provider>
}