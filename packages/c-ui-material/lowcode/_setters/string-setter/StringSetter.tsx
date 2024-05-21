import * as React from 'react';
import { FC } from 'react';
import { Input } from 'antd';
import { SetterHoc } from '../../common';

export interface IStringSetterProps {
  value: string;
  defaultValue: string;
  placeholder: string;
  onChange: (val: string) => void;
}

export const StringSetterFun: FC<IStringSetterProps> = (props) => {
  const { onChange, placeholder, value } = props;
  return (
    <Input
      size="small"
      value={value}
      placeholder={placeholder || ''}
      onChange={(e: any) => {
        onChange(e.target?.value);
      }}
      style={{ width: '100%' }}
    />
  );
};

export const StringSetter = SetterHoc(StringSetterFun);
