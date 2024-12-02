import React, { FC } from 'react';
import { Input } from 'antd-mobile';
import { IFieldInputProps } from './FieldInput';
import { useFormContainerSelector } from '@/components/form-container';

export const FieldInputMobile: FC<IFieldInputProps> = ({ onChange, value }) => {
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);
  return <div>暂不实现</div>;
};
