import { ChangeEvent, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import {
  PACKAGES_QUERY_KEY,
  PackageResponse,
  useAddPackageMutation,
} from 'client/services';

export const AddPackage = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');

  const { mutate, isLoading } = useAddPackageMutation({
    onSuccess(newPackage) {
      queryClient.setQueryData<PackageResponse[]>(
        [PACKAGES_QUERY_KEY],
        (data) => {
          if (data) {
            return [...data, newPackage];
          }

          return data;
        },
      );
      setName('');
    },
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isLoading && name) mutate(name);
  }, [name, isLoading, mutate]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="10px"
      width="100%"
    >
      <TextField
        placeholder="Google play link"
        value={name}
        onChange={handleChange}
        fullWidth
        sx={{ maxWidth: '700px' }}
      />
      <LoadingButton
        variant="contained"
        disabled={!name}
        loading={isLoading}
        onClick={handleSubmit}
      >
        Add
      </LoadingButton>
    </Box>
  );
};
