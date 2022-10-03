import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { apiClient } from '../api-client';

import { PackageResponse } from './types';

export const useAddPackageMutation = (
  options?: UseMutationOptions<PackageResponse, unknown, string>,
) => useMutation((name) => apiClient.post('/packages', { name }), options);
