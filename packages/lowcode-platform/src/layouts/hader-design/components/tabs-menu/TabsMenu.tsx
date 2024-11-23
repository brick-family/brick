import { Tabs } from 'antd';
import React, { FC, useEffect, useRef, useState } from 'react';
import { history, useLocation, useParams } from '@umijs/max';

import s from './tabsMenu.less';

const tabsData = [
  {
    label: `页面管理`,
    key: 'pages',
  },
  {
    label: `自动化`,
    key: 'workflow',
  },
  {
    label: `应用设置`,
    key: 'setting',
  },
];

export interface ITabsMenuProps {}

export const TabsMenu: FC<ITabsMenuProps> = (props) => {
  const { aId, resourceId } = useParams();
  const [activeKey, setActiveKey] = useState<string>();

  const resourceIdRef = useRef<string>();
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;
    const activeKey = tabsData.find((item) => pathName.includes(item.key))?.key || 'pages';
    setActiveKey(activeKey);
  }, []);

  const onChange = (key: string) => {
    let url = '';
    if (resourceId) {
      // 记录当前选中的资源id
      resourceIdRef.current = resourceId;
    }
    if (key === 'pages') {
      url = `/app/${aId}/${resourceIdRef.current || 'home'}`;
    }
    if (key === 'workflow') {
      url = `/app/${aId}/workflow`;
    }
    if (key === 'setting') {
      url = `/app/${aId}/setting`;
    }
    setActiveKey(key);
    history.push(url);
  };
  return (
    <div className={s.menu}>
      <Tabs activeKey={activeKey} onChange={onChange} size="middle" items={tabsData} />
    </div>
  );
};
