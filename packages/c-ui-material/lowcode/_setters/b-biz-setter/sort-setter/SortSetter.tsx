import React, { FC } from 'react';
import { SetterHoc } from '../../../common';

export interface ISortSetterProps {}

const SortSetterFun: FC<ISortSetterProps> = (props) => {
  return <div>sort setter</div>;
};

export const SortSetter = SetterHoc(SortSetterFun);
