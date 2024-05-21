import React, { FC } from 'react';
import s from './wrapperContent.less';

export interface IWrapperContentProps {
  children?: React.ReactElement;
}

export const WrapperContent: FC<IWrapperContentProps> = (props) => {
  return <div className={s.wrapper}>{props.children}</div>;
};
