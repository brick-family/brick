import React, { FC } from 'react';
import { TAppOperatorCode } from '@brick/types';
import { useAppListAuth } from './hooks';

export interface IAuthWrapperProps {
  appOperatorCode?: TAppOperatorCode;
  children?: React.ReactNode;
}

/**
 * app 权限包装器
 * @param props
 * @constructor
 */
export const AppListAuthWrapper: FC<IAuthWrapperProps> = (props) => {
  const hasAuth = useAppListAuth(props.appOperatorCode);
  if (!hasAuth) {
    return <></>;
  }
  return <>{props.children}</>;
};
