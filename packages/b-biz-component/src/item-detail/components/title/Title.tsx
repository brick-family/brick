import s from './title.module.less';
import { EMode, useItemDetailSelector } from '../..';

import React, { FC, memo } from 'react';
import { Toolbar } from './Toolbar';

export interface ITitleProps {}

export const Title: FC<ITitleProps> = memo((props) => {
  const [mode] = useItemDetailSelector((s) => [s.mode]);
  return (
    <div className={s.title}>
      <div className={s.label}>{mode === EMode.create ? '创建' : '编辑'}</div>
      <Toolbar />
    </div>
  );
});
