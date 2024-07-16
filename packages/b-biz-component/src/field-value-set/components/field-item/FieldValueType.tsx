import React, { FC } from 'react';
import { EFieldValueType, TFieldValueType } from '../../types';
import { Select } from 'antd';

const options = [
  {
    value: EFieldValueType.value,
    label: '值',
  },
  {
    value: EFieldValueType.formula,
    label: '表达式',
  },
];

export interface IFieldValueTypeProps {
  value: TFieldValueType;
  onChange?: (value: TFieldValueType) => void;
}

export const FieldValueType: FC<IFieldValueTypeProps> = (props) => {
  const { value, onChange } = props;

  const handleChange = (value: TFieldValueType) => {
    onChange?.(value);
  };

  return <Select onChange={handleChange} options={options} value={value}></Select>;
};
