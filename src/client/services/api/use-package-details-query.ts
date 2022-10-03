import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { getQueryFetcher } from '../helpers';

import { PackageResponse } from './types';

export const getPackageQueryKey = (id: number) => `/packages/${id}`;

export const usePackageDetailsQuery = (
  id: number,
  options?: UseQueryOptions<PackageResponse>,
) => {
  const { data, isFetching, isError } = useQuery<PackageResponse>(
    [getPackageQueryKey(id)],
    getQueryFetcher<PackageResponse>(apiClient),
    options,
  );

  return {
    packageDetail: data,
    isLoading: isFetching,
    isError,
  };
};
