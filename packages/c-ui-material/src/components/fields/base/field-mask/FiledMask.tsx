import React, { FC } from 'react';
import './fieldMask.less';
import classNames from 'classnames';
import { generatorClass, isDesign } from '@/components';

export interface IFiledMaskProps {}

export const FiledMask: FC<IFiledMaskProps> = (props) => {
  const rootClassNames = classNames(generatorClass('field-mask'));
  const currIsDesign = isDesign(props);
  if (!currIsDesign) {
    return <></>;
  }
  return <div className={rootClassNames}></div>;
};
