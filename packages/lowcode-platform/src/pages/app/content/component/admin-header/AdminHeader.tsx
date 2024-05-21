import React, { FC } from 'react';
import { SettingButton } from '@/pages/app/content/component';
import { useGlobalSelector } from '@brick/processor';
import s from './AdminHeader.module.less';
import { ResourceName } from '@/layouts/components/resource-name';

export interface IAdminHeaderProps {}

export const AdminHeader: FC<IAdminHeaderProps> = (props) => {
  const [isAppAdmin] = useGlobalSelector((s) => [s.isAppAdmin]);

  if (isAppAdmin) {
    return (
      <div className={s.header}>
        <ResourceName />
        {isAppAdmin && (
          <div>
            <SettingButton />
          </div>
        )}
      </div>
    );
  }
  return <></>;
};
