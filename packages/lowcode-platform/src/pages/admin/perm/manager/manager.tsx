import React, { FC, memo } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Group } from './group';
import {
  AdminPermManagerProvider,
  useAdminPermManagerSelector,
} from '@/pages/admin/perm/manager/admin-perm-manager-processor';
import { GroupSet } from '@/pages/admin/perm/manager/group-set';

export const ManagerContent: FC<IManagerProps> = memo((props) => {
  const [currTenantGroup] = useAdminPermManagerSelector((s) => [s.currTenantGroup]);
  return (
    <ProCard split="vertical">
      <ProCard title="" colSpan="30%">
        <Group />
      </ProCard>
      <ProCard title={currTenantGroup?.name!} headerBordered>
        <GroupSet />
      </ProCard>
    </ProCard>
  );
});

export interface IManagerProps {}

export const Manager: FC<IManagerProps> = (props) => {
  return (
    <AdminPermManagerProvider>
      <ManagerContent {...props} />
    </AdminPermManagerProvider>
  );
};

export default Manager;
