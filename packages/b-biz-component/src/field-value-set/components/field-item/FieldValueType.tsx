import React, { FC } from 'react';
import { EFieldValueType, TFieldValueType } from '../../types';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';

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

export interface IFieldValueTypeProps extends SelectProps {
  value: TFieldValueType;
  onChange?: (value: TFieldValueType) => void;
}

export const FieldValueType: FC<IFieldValueTypeProps> = (props) => {
  const { value, onChange, ...otherProps } = props;

  const handleChange = (value: TFieldValueType) => {
    onChange?.(value);
  };

  return <Select onChange={handleChange} options={options} value={value} {...otherProps}></Select>;
};
