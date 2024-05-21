import React, { FC, memo } from 'react';
import { Button, Divider, Space, Tooltip } from 'antd';
import {
  CopyOutlined,
  LeftOutlined,
  PrinterOutlined,
  RightOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import s from './title.module.less';
import { EMode, useItemDetailSelector } from '../..';

export interface IToolbarProps {}

export const Toolbar: FC<IToolbarProps> = memo((props) => {
  const [mode, prevData, nextData, copyData, share, print] = useItemDetailSelector((s) => [
    s.mode,
    s.prevData,
    s.nextData,
    s.copyData,
    s.share,
    s.print,
  ]);
  if (mode !== EMode.detail) {
    return <></>;
  }
  return (
    <div className={s.toolbar}>
      <Space size={6}>
        <Tooltip title="上一条">
          <Button
            size={'small'}
            onClick={prevData}
            className="icon-button"
            icon={<LeftOutlined />}
          ></Button>
        </Tooltip>
        <Tooltip title="下一条">
          <Button
            size={'small'}
            onClick={nextData}
            className="icon-button"
            icon={<RightOutlined />}
          ></Button>
        </Tooltip>
      </Space>
      <Divider type="vertical" />
      <Space size={6}>
        <Tooltip title="复制">
          <Button
            size={'small'}
            onClick={copyData}
            className="icon-button"
            icon={<CopyOutlined />}
          ></Button>
        </Tooltip>
        <Tooltip title="分享">
          <Button
            size={'small'}
            onClick={share}
            className="icon-button"
            icon={<ShareAltOutlined />}
          ></Button>
        </Tooltip>
        <Tooltip title="打印">
          <Button
            size={'small'}
            onClick={print}
            className="icon-button"
            icon={<PrinterOutlined />}
          ></Button>
        </Tooltip>
      </Space>
    </div>
  );
});
