import React, { FC } from 'react';
import { BaseWrapper, BaseWrapperProps } from '../base/BaseWrapper';
import { useFormContainerSelector } from '../../form-container';
import { EFieldStatus, EFieldType } from '@brick/types';
import { BRichEditor } from '@brick/component';

export interface IFieldRichProps extends BaseWrapperProps<EFieldType.RICH> {}

export const FieldRich: FC<IFieldRichProps> = (props) => {
  const { value, onChange, columnConfig, ...otherProps } = props;
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  return (
    <BaseWrapper {...props}>
      <BRichEditor
        disabled={readonly || columnConfig?.status == EFieldStatus.disable}
        placeholder={columnConfig?.placeholder}
        initialValue={value}
        onChange={onChange}
      />
    </BaseWrapper>
  );
};
