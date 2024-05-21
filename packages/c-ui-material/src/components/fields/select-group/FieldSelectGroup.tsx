import React, { FC } from 'react';
import { BaseWrapper, BaseWrapperProps } from '@/components/fields/base';
import { EFieldType } from '@brick/types';
import { BaseFieldSelect } from '@brick/biz-component';

export interface IFieldSelectGroupProps extends BaseWrapperProps<EFieldType.SELECT> {}

export const FieldSelectGroup: FC<IFieldSelectGroupProps> = (props) => {
  return (
    <BaseWrapper {...props}>
      <BaseFieldSelect selectProps={{ mode: 'multiple' }} {...props} />
    </BaseWrapper>
  );
};
