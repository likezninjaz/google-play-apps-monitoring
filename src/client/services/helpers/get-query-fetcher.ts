import { AxiosInstance } from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

type QueryKey = [string, Record<string, unknown>];

export const getQueryFetcher =
  <Response = unknown>(apiClient: AxiosInstance) =>
  ({ queryKey }: QueryFunctionContext) => {
    const [key, params] = queryKey as QueryKey;

    return apiClient.get<Response>(key, { params });
  };
