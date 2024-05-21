import { Spin, SpinProps } from 'antd';
import React, { FC, memo } from 'react';
import s from './spin.less';

export interface IBSpinProps extends SpinProps {}

export const BSpin: FC<IBSpinProps> = memo((props) => {
  return (
    <div className={s.spin}>
      <Spin {...props} />
    </div>
  );
});
