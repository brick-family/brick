import React, { FC } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Dropdown, MenuProps } from 'antd';

import { SettingOutlined } from '@ant-design/icons';

export interface ISettingProps {
  settingMenuItems: MenuProps['items'];
}

export const Setting: FC<ISettingProps> = ({ settingMenuItems }) => {
  const getPopupContainer = useMemoizedFn((triggerNode: HTMLElement) => {
    return triggerNode?.parentElement || document.body;
  });

  if (!settingMenuItems || settingMenuItems.length === 0) {
    return <></>;
  }

  return (
    <>
      <Dropdown
        overlayStyle={{ minWidth: 100 }}
        menu={{ items: settingMenuItems }}
        trigger={['hover']}
        // getPopupContainer={getPopupContainer}
        placement="bottom"
      >
        <div style={{ cursor: 'pointer' }} onClick={(e: any) => e.stopPropagation()}>
          <SettingOutlined />
        </div>
      </Dropdown>
    </>
  );
};
