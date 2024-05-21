import React, { FC, memo, useEffect } from 'react';

import AdminLayout from '@/layouts/admin-layout/AdminLayout';
import { history, Outlet, useLocation, useParams } from '@umijs/max';
import config from './config';

export interface IAppAdminProps {}

export const AppAdmin: FC<IAppAdminProps> = memo((props) => {
  const { aId } = useParams();
  const location = useLocation();
  useEffect(() => {
    history.replace(`/app/${aId}/setting/perm`);
  }, []);
  return (
    <AdminLayout basePath={`/app/${aId}/setting`} config={config}>
      <Outlet />
    </AdminLayout>
  );
});
export default AppAdmin;
