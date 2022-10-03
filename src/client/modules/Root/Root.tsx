import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { QueryClientProvider } from 'client/context';
import { Loader } from 'client/components';

const Packages = lazy(() => import('../Packages'));
const PackageDetails = lazy(() => import('../PackageDetails'));

export const Root = () => {
  return (
    <QueryClientProvider>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Packages />
              </Suspense>
            }
          />
          <Route
            path="/packages/:packageId"
            element={
              <Suspense fallback={<Loader />}>
                <PackageDetails />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
