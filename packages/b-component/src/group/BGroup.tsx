import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import React, { FC } from 'react';
import { Item } from './Item';
import s from './gropu.less';

export interface IBGroupProps {
  style?: React.CSSProperties;
  className?: string;
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 是否显示添加按钮
   */
  isAdd?: boolean;
  /**
   * 点击添加按钮的回调
   */
  onAddClick?: () => void;
  children?: React.ReactNode;
}

export const BGroup: FC<IBGroupProps> & { Item: typeof Item } = ({
  title,
  isAdd,
  onAddClick,
  children,
  style,
  className,
  contentClassName,
  contentStyle,
}) => {
  return (
    <div style={style} className={classNames(s.group, className)}>
      <div className={s.header}>
        <div className={s.title}>{title}</div>
        {isAdd && <Button onClick={onAddClick} type="text" icon={<PlusOutlined />} size="small" />}
      </div>
      <div style={contentStyle} className={classNames(s.content, contentClassName)}>
        {children}
      </div>
    </div>
  );
};

BGroup.Item = Item;
