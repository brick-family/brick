import { Empty, EmptyProps } from 'antd';
import React, { FC, memo } from 'react';
import s from './empty.less';

export interface IBEmptyProps extends EmptyProps {}

export const BEmpty: FC<IBEmptyProps> = memo((props) => {
  return (
    <div className={s.empty}>
      <Empty {...props} />
    </div>
  );
});
