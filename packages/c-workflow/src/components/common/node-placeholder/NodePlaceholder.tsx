import classNames from 'classnames';
import React, { FC } from 'react';
import s from './nodePlaceholder.module.less';

export interface INodePlaceholderProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export const NodePlaceholder: FC<INodePlaceholderProps> = (props) => {
  const { children, style, className } = props;
  return (
    <div className={classNames(s.nodePlaceholder, className, 'saf')} style={style}>
      {children}
    </div>
  );
};
