import * as React from 'react';
import { FC } from 'react';
import { Switch } from 'antd';
import { SetterHoc } from '../../common';

interface IBoolSetterProps {
  value: boolean;
  disabled: boolean;
  defaultValue: any;
  onChange: (val: number) => void;
}

export const BoolSetterFun: FC<IBoolSetterProps> = (props) => {
  const { onChange, value } = props;
  return (
    <Switch
      className="switch-style"
      checked={value}
      size="small"
      onChange={(val: any) => onChange(val)}
    />
  );
};

export const BoolSetter = SetterHoc(BoolSetterFun);
