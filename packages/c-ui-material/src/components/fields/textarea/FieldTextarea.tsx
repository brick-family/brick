import * as React from 'react';
import { FC } from 'react';
import { Input } from 'antd';
import { BaseWrapper, BaseWrapperProps } from '../base';
import { useFormContainerSelector } from '../../form-container';
import { EFieldStatus, EFieldType } from '@brick/types';

export interface IFieldTextareaProps extends BaseWrapperProps<EFieldType.TEXT> {}

export const FieldTextarea: FC<IFieldTextareaProps> = (props) => {
  const { value, onChange, columnConfig, ...otherProps } = props;
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  return (
    <BaseWrapper {...props}>
      <Input.TextArea
        disabled={readonly || columnConfig?.status == EFieldStatus.disable}
        placeholder={columnConfig?.placeholder}
        value={value}
        onChange={onChange}
      />
    </BaseWrapper>
  );
};
