import React, { FC } from 'react';
import { IFieldInputProps } from './FieldInput';
import { useFormContainerSelector } from '@/components/form-container';
import { Input } from 'antd';
import { EFieldStatus } from '@brick/types';

export const FieldInputWeb: FC<IFieldInputProps> = ({
  value,
  onChange,
  columnConfig = {},
  ...otherProps
}) => {
  const { status, placeholder } = columnConfig;
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);
  return (
    <Input
      disabled={readonly || status == EFieldStatus.disable}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
