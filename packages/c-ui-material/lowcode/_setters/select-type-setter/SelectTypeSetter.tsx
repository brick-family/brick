import React, { FC } from 'react';
import { SetterHoc } from '../../common';
import { Switch } from 'antd';
import { EColumnSelectType } from '@brick/types';

export interface ISelectTypeSetterProps {
  value: number;
  disabled: boolean;
  defaultValue: any;
  onChange: (val: number) => void;
}

const SelectTypeSetterFun: FC<ISelectTypeSetterProps> = (props) => {
  const { onChange, value } = props;
  return (
    <Switch
      className="switch-style"
      checked={value === EColumnSelectType.multiple}
      size="small"
      onChange={(val: any) =>
        onChange(!val ? EColumnSelectType.single : EColumnSelectType.multiple)
      }
    />
  );
};

export const SelectTypeSetter = SetterHoc(SelectTypeSetterFun);
