import { useGlobalSelector } from '@/global-processor';
import React, { FC, useState } from 'react';
import { AlignLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { IconSelect } from '@brick/biz-component';
import s from './appLogoPopover.less';

export interface IAppButtonProps {}

export const AppButton: FC<IAppButtonProps> = (props) => {
  const [app] = useGlobalSelector((s) => [s.userInfo.app]);
  const [isHover, setIsHover] = useState(false);
  return (
    <div>
      <Button
        type="text"
        className={s.button}
        size="large"
        style={{ paddingLeft: 10 }}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        icon={
          isHover ? (
            <DoubleRightOutlined style={{ color: '#525967' }} />
          ) : (
            <AlignLeftOutlined style={{ color: '#525967' }} />
          )
        }
      >
        <IconSelect
          defaultSelectFirst={false}
          readonly
          type="app"
          size={28}
          style={{ marginRight: 6, marginLeft: 2, borderRadius: 4 }}
          data={app?.extraParam?.icon}
        />
        <span className={s.text}>{app?.name}</span>
      </Button>
    </div>
  );
};
