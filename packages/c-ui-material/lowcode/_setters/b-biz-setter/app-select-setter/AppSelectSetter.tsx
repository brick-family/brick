import React, { FC } from 'react';
import { SetterHoc } from '../../../common';
import { SelectSetterFun } from '../../select-setter';
import { useTablesOptions } from '@brick/biz-component';

export interface IAppSelectSetterProps {
  value: string;
  onChange: (value: string) => void;
}

const AppSelectSetterFun: FC<IAppSelectSetterProps> = (props) => {
  // 查询当前应用下的所有的表
  const { options } = useTablesOptions();
  return (
    <SelectSetterFun
      changeReRenderEvent
      onChange={props.onChange}
      options={options}
      value={props.value}
    />
  );
};

export const AppSelectSetter = SetterHoc(AppSelectSetterFun);
