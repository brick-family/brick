import React, { FC } from 'react';
import { useCurrResource } from '@/hooks';
import s from './ResourceName.module.less';
import classNames from 'classnames';

export interface IResourceNameProps {
  style?: React.CSSProperties;
  className?: string;
}

export const ResourceName: FC<IResourceNameProps> = (props) => {
  const { style, className } = props;
  const { resource } = useCurrResource();
  return (
    <div style={style} className={classNames(s.name, className)}>
      {resource?.title || ''}
    </div>
  );
};
