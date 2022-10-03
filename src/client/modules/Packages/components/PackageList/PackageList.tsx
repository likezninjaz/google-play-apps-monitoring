import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { usePackagesQuery } from 'client/services';
import { Loader } from 'client/components';

export const PackageList = () => {
  const navigate = useNavigate();
  const { packages, isLoading } = usePackagesQuery();

  if (isLoading)
    return (
      <Box mt="30px">
        <Loader />
      </Box>
    );

  return (
    <TableContainer component={Paper} sx={{ marginTop: '30px', minWidth: 700 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Package name</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Monitor count
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              View monitoring
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.screenshots.length}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  onClick={() => navigate(`/packages/${row.id}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
