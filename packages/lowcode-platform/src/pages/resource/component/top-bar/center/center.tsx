import React, { FC } from 'react';
import { Tabs } from 'antd';
import styles from './center.less';
import { history } from '@umijs/max';

export interface ICenterProps {}

export const Center: FC<ICenterProps> = (props) => {
  const onChange = (key: string) => {
    console.log('q=>key', key);
    history.push(key);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      items={[
        {
          label: `表单设计`,
          key: 'design',
          // children: `Content of Tab Pane 1`,
        },
        {
          label: `流程设计`,
          key: 'process',
          // children: `Content of Tab Pane 2`,
        },
        {
          label: `页面设置`,
          key: 'setting',
          // children: `Content of Tab Pane 3`,
        },
        {
          label: `数据管理`,
          key: '4',
          // children: `Content of Tab Pane 3`,
        },
      ]}
    />
  );
};
