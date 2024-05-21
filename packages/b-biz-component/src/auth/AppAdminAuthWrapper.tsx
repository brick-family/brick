import React, { FC } from 'react';
import { useAppAdmin } from '@brick/biz-component';

export interface IAppAdminAuthWrapperProps {
  children?: React.ReactNode;
}

/**
 * 应用管理员权限包装
 * @param props
 * @constructor
 */
export const AppAdminAuthWrapper: FC<IAppAdminAuthWrapperProps> = (props) => {
  const { isAppAdmin } = useAppAdmin();
  if (!isAppAdmin) {
    return <></>;
  }
  return <>{props.children}</>;
};
