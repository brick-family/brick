import React, { FC } from 'react';

import s from './groupSet.less';
import { Descriptions } from 'antd';
import { SelectManager } from '@/pages/admin/perm/manager/group-set/components/select-manager';
import { SelectApp } from '@/pages/admin/perm/manager/group-set/components';
import { useAdminPermManagerSelector } from '@/pages/admin/perm/manager/admin-perm-manager-processor';

export interface IGroupSetProps {}

export const GroupSet: FC<IGroupSetProps> = (props) => {
  const [refreshTenantGroupUserApp] = useAdminPermManagerSelector((s) => [
    s.refreshTenantGroupUserApp,
  ]);
  const items = [
    {
      label: '管理员',
      children: <SelectManager onSuccess={refreshTenantGroupUserApp} />,
      span: 3,
    },
    {
      label: '应用权限',
      children: <SelectApp onSuccess={refreshTenantGroupUserApp} />,
      span: 3,
    },
    {
      label: '管理范围',
      children: 'Cloud Database',
      span: 3,
    },
  ];
  return (
    <div className={s.groupSet}>
      <Descriptions bordered column={3} items={items} />
    </div>
  );
};
