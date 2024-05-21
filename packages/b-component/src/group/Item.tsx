import classNames from 'classnames';
import React, { FC } from 'react';
import s from './gropu.less';

export interface IItemProps {
  title: string;
  icon?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  active?: boolean;
}

export const Item: FC<IItemProps> = ({ title, onClick, style, className, active }) => {
  return (
    <div
      style={style}
      onClick={onClick}
      className={classNames(s.item, className, {
        [s.active]: active,
      })}
    >
      {title}
    </div>
  );
};
