import React, { FC, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import styles from './center.less';
import { history, useLocation, useParams } from '@umijs/max';

const tabsData = [
  {
    label: `表单设计`,
    key: 'design',
  },
  {
    label: `流程设计`,
    key: 'process',
  },
  {
    label: `页面设置`,
    key: 'setting',
  },
  {
    label: `数据管理`,
    key: 'data',
  },
];

export interface ICenterProps {}

export const Center: FC<ICenterProps> = (props) => {
  const params = useParams();

  const [activeKey, setActiveKey] = useState('design');

  const location = useLocation();

  useEffect(() => {
    // 首次渲染设置默认值
    const pathName = location.pathname;
    const activeKey = tabsData.find((item) => pathName.includes(item.key))?.key || 'data';
    setActiveKey(activeKey);
  }, []);

  const onChange = (key: string) => {
    console.log('q=>key', key);
    setActiveKey(key);
    history.push(key);
  };

  return <Tabs activeKey={activeKey} onChange={onChange} items={tabsData} />;
};
