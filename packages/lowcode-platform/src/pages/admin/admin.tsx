import React, { FC } from 'react';
import { Outlet } from 'umi';
import config from './config';
import { useGlobalSelector } from '@/global-processor';
import AdminLayout from '@/layouts/admin-layout/AdminLayout';

export interface IAdminProps {}

export const Admin: FC<IAdminProps> = (props) => {
  const currTenant = useGlobalSelector((s) => s.currTenant);

  // 不需要处理
  // const routerData = useRouteData();
  // const location = useLocation()
  // const params = useParams();
  //
  // console.log('q=>routerData', routerData, location);
  // useEffect(() => {
  //   const currPath = generatePath(routerData?.route?.path!, params);
  //   console.log('p->currPath', currPath, params);
  //   if (location?.pathname.includes(currPath) && location?.pathname !== currPath) {
  //     // history.replace(`/admin/${currTenant.id}/base/info`)
  //
  //   }
  // }, [currTenant.id])

  return (
    <AdminLayout basePath={`/admin/${currTenant.id}`} config={config}>
      <Outlet />
    </AdminLayout>
  );
};

export default Admin;
