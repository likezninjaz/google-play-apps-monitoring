import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';

import { PackageScreenshot } from 'client/services';

export const Screenshot = ({ name, createdAt }: PackageScreenshot) => {
  return (
    <Box
      sx={{
        padding: '20px 0',
        borderTop: '1px solid grey',
        '&:first-child': { border: 0 },
      }}
    >
      <Box display="flex" alignItems="center" gap="10px">
        <Typography>Screenshot time:</Typography>
        <Typography>{format(new Date(createdAt), 'PPpp')}</Typography>
      </Box>
      <Box mt="10px">
        <img
          width="100%"
          src={`${import.meta.env.VITE_API_URL}/screenshots/${name}`}
          alt=""
        />
      </Box>
    </Box>
  );
};
