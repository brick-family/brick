import React, { FC } from 'react';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { AppLogTable } from './AppLogTable';
import classNames from 'classnames';
import {
  AdminPermLogProvider,
  IAdminPermLogProviderProps,
} from '@/pages/admin/audit/app-log-processor/AdminPermLogProvider';

export interface ICompanyLogProps extends Omit<IAdminPermLogProviderProps, 'children'> {
  style?: React.CSSProperties;
  className?: string;
}

export const CompanyLogContent: FC<ICompanyLogProps> = (props) => {
  return (
    <ProCard>
      <AppLogTable />
    </ProCard>
  );
};

export const CompanyLog: FC<ICompanyLogProps> = ({ style, className, ...otherProps }) => {
  return (
    <AdminPermLogProvider {...otherProps}>
      <div style={style} className={classNames(className)}>
        <CompanyLogContent />
      </div>
    </AdminPermLogProvider>
  );
};

export default CompanyLog;
