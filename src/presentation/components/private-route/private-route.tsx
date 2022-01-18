import { ApiContext } from '@/presentation/contexts';
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = (): any => {
  const { getCurrentAccount } = useContext(ApiContext)
  const account = getCurrentAccount()
  const auth = !!(account?.accessToken)

  return auth ? <Outlet /> : <Navigate to="/login" />;
}
