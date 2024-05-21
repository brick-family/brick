import React, { FC } from 'react';
import { Tabs } from 'antd';
import styles from './center.less';

export interface ICenterProps {}

export const Center: FC<ICenterProps> = (props) => {
  const onChange = () => {};

  return (
    <div className={styles.center}>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={[
          {
            label: `表单设计`,
            key: '1',
            // children: `Content of Tab Pane 1`,
          },
          {
            label: `扩展功能`,
            key: '2',
            // children: `Content of Tab Pane 2`,
          },
          {
            label: `表单发布`,
            key: '3',
            // children: `Content of Tab Pane 3`,
          },
          {
            label: `数据管理`,
            key: '4',
            // children: `Content of Tab Pane 3`,
          },
        ]}
      />
    </div>
  );
};
