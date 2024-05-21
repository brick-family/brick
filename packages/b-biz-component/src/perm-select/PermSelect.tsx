import React, { FC, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import classNames from 'classnames';

import { IPermSelectProviderProps, PermSelectProvider } from '@brick/biz-component';
import { DataPerm } from './data-perm';
import { FieldPerm } from './field-perm';
import { OperationPerm } from './operation-perm';

import s from './permSelect.less';

export interface IPermSelectContentProps {}

export const PermSelectContent: FC<IPermSelectContentProps> = (props) => {
  const [activeKey, setActiveKey] = useState('1');
  const items = useMemo(() => {
    return [
      {
        key: '1',
        label: '操作权限',
        children: <OperationPerm />,
      },
      {
        key: '2',
        label: '字段权限',
        children: <FieldPerm />,
      },
      {
        key: '3',
        label: '数据权限',
        children: <DataPerm />,
      },
    ];
  }, []);

  const onChange = (key: string) => {
    setActiveKey(key);
  };
  return <Tabs activeKey={activeKey} tabPosition={'left'} onChange={onChange} items={items} />;
};

export interface IPermSelectProps extends Omit<IPermSelectProviderProps, 'children'> {
  style?: React.CSSProperties;
  className?: string;
}
export const PermSelect: FC<IPermSelectProps> = ({ className, style, ...otherProps }) => {
  return (
    <PermSelectProvider {...otherProps}>
      <div style={style} className={classNames(s.permSelect, className)}>
        <PermSelectContent />
      </div>
    </PermSelectProvider>
  );
};
