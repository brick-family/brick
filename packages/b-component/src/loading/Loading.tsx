import { Spin, SpinProps } from 'antd';
import React from 'react';
import s from './loading.less';

export interface BLoadingProps extends SpinProps {
  // 根据父级内容水平垂直居中
  type?: 'center';
}

export const BLoading = (props: BLoadingProps) => {
  const { type = 'center', ...otherProps } = props;

  const spinJsx = <Spin {...otherProps} />;
  if (type === 'center') {
    return <div className={s.center}>{spinJsx}</div>;
  }

  return spinJsx;
};
