import React, { FC } from 'react';
import { Divider, Space, Typography } from 'antd';
import s from './linkList.less';
import classNames from 'classnames';

export interface ILinkItem<T extends any = any> {
  name?: string;
  label?: string;
  value: T;
}
export interface IBLinkListProps<T extends any = any> {
  data: ILinkItem<T>[];
  active?: T;
  onClick?: (value: T) => void;
}

export const BLinkList: FC<IBLinkListProps> = ({ data, active, onClick }) => {
  return (
    <div className={s.list}>
      <Space split={<Divider type="vertical" />}>
        {data.map((item) => {
          const label = item.name || item.label;
          return (
            <Typography.Link
              className={classNames(s.item, {
                [s.active]: item.value === active,
              })}
              onClick={() => onClick?.(item.value)}
              key={label}
            >
              {label}
            </Typography.Link>
          );
        })}
      </Space>
    </div>
  );
};
