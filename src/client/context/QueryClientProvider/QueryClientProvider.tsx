import { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type QueryClientProviderProps = {
  children?: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => (
  <ReactQueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools />
  </ReactQueryClientProvider>
);
