import { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Box, Button, Link, Typography } from '@mui/material';

import { usePackageDetailsQuery } from 'client/services';
import { Loader } from 'client/components';

import { Screenshot } from './components';

const PackageDetails = () => {
  const navigate = useNavigate();
  const { packageId } = useParams();
  const { packageDetail, isLoading } = usePackageDetailsQuery(
    Number(packageId),
  );

  const handleClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (isLoading) return <Loader />;

  if (!packageDetail) return <Navigate to="/" />;

  const { name, screenshots, createdAt } = packageDetail;
  const link = `https://play.google.com/store/apps/details?id=${name}`;

  return (
    <Box padding="20px" maxWidth={1024} margin="0 auto">
      <Button onClick={handleClickBack}>Back</Button>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h4" mt="20px">
          {name}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: '20px',
          marginTop: '20px',
          borderBottom: '4px solid grey',
        }}
      >
        <Box display="flex" alignItems="center" gap="10px">
          <Typography fontWeight="bold">Link:</Typography>
          <Link href={link} target="_blank">
            {link}
          </Link>
        </Box>
        <Box display="flex" alignItems="center" gap="10px" mt="10px">
          <Typography fontWeight="bold">Start time:</Typography>
          <Typography>{format(new Date(createdAt), 'PPpp')}</Typography>
        </Box>
      </Box>
      <Box>
        {screenshots.map((screenshot) => (
          <Screenshot key={screenshot.id} {...screenshot} />
        ))}
      </Box>
    </Box>
  );
};

export default PackageDetails;
