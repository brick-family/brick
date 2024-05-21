import React, { FC } from 'react';
import { User } from './components';
import classNames from 'classnames';

import s from './rightInfo.less';
import { TenantList } from './components/tenant-list';
import { Divider } from 'antd';

export interface IRightInfoProps {
  showTenant?: boolean;
}

export const RightInfo: FC<IRightInfoProps> = ({ showTenant = true }) => {
  const className = classNames('flex-center', s.right);
  return (
    <div className={className}>
      {showTenant && (
        <>
          <TenantList />
          <Divider type="vertical" />
        </>
      )}

      <User />
    </div>
  );
};
