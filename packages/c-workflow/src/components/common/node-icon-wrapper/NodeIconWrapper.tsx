import classNames from 'classnames';
import React, { FC } from 'react';
import s from './nodeIconWrapper.module.less';

export interface INodeIconWrapperProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export const NodeIconWrapper: FC<INodeIconWrapperProps> = (props) => {
  const { className, style, children } = props;
  return (
    <div className={classNames(s.iconWrapper, className)} style={style}>
      {children}
    </div>
  );
};
