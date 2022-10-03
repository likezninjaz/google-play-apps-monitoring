import { Box } from '@mui/material';

import { AddPackage, PackageList } from './components';

const Packages = () => {
  return (
    <Box display="flex" flexDirection="column" padding="20px">
      <AddPackage />
      <PackageList />
    </Box>
  );
};

export default Packages;
