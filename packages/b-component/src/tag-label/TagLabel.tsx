import { Avatar, AvatarProps } from 'antd';
import classNames from 'classnames';
import React, { FC } from 'react';
import s from './tagLabel.less';

export interface IBTagLabelProps {
  style?: React.CSSProperties;
  className?: string;
  avatarProps: AvatarProps;
  children?: React.ReactNode;
}

export const BTagLabel: FC<IBTagLabelProps> = ({ style, className, avatarProps, children }) => {
  return (
    <div style={style} className={classNames(s.tagLabel, className)}>
      <Avatar {...avatarProps} />
      <div className={s.name}>{children}</div>
    </div>
  );
};
