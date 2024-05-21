import * as React from 'react';
import { FC } from 'react';
import { InputNumber } from 'antd';
import { SetterHoc } from '../../common';

export interface INumberSetterProps {
  value: number;
  min: number;
  max: number;
  defaultValue: number;
  step: number | string;
  units: string;
  onChange: (val: number | null) => void;
  precision: number;
}

export const NumberSetterFun: FC<INumberSetterProps> = (props) => {
  const {
    onChange,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    step = 1,
    units = '',
    precision = 0,
    value,
  } = props;

  return (
    <InputNumber
      size="small"
      style={{ width: '100%' }}
      className="lowcode-setter-number"
      value={value}
      min={min}
      max={max}
      precision={precision}
      step={step}
      // innerAfter={units}
      onChange={(val: any) => {
        onChange(!val ? 0 : val);
      }}
    />
  );
};
export const NumberSetter = SetterHoc(NumberSetterFun);
