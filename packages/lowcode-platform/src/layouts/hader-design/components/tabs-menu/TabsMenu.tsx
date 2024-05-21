import { Tabs } from 'antd';
import React, { FC, useEffect, useRef, useState } from 'react';
import { history, useLocation, useParams } from '@umijs/max';

import s from './tabsMenu.less';
export interface ITabsMenuProps {}

export const TabsMenu: FC<ITabsMenuProps> = (props) => {
  const { aId, resourceId } = useParams();
  const [activeKey, setActiveKey] = useState<string>();

  const resourceIdRef = useRef<string>();
  const location = useLocation();
  useEffect(() => {
    const pathName = location.pathname;
    if (pathName?.includes('workflow')) {
      setActiveKey('workflow');
    } else if (pathName?.includes('setting')) {
      setActiveKey('setting');
    } else {
      setActiveKey('pages');
    }
    // setActiveKey
  }, [location.pathname]);

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
    history.push(url);
  };
  return (
    <div className={s.menu}>
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        size="middle"
        items={[
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
        ]}
      />
    </div>
  );
};
