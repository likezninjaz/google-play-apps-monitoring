import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { getQueryFetcher } from '../helpers';

import { PackageResponse } from './types';

export const PACKAGES_QUERY_KEY = '/packages';

const INITIAL_PACKAGES = <PackageResponse[]>[];

export const usePackagesQuery = (
  options?: UseQueryOptions<PackageResponse[]>,
) => {
  const { data, isFetching, isError } = useQuery<PackageResponse[]>(
    [PACKAGES_QUERY_KEY],
    getQueryFetcher<PackageResponse[]>(apiClient),
    options,
  );

  return {
    packages: data ?? INITIAL_PACKAGES,
    isLoading: isFetching,
    isError,
  };
};
