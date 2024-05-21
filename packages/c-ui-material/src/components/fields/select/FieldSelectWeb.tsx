import React, { FC, memo } from 'react';
import { BaseFieldSelect } from '@brick/biz-component';
import { IFieldSelectProps } from '@/components';

export const FieldSelectWeb: FC<IFieldSelectProps> = memo((props) => {
  return <BaseFieldSelect {...props} />;
});
