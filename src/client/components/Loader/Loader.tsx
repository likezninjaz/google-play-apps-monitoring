import { Box, CircularProgress } from '@mui/material';

export const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    <CircularProgress />
  </Box>
);
