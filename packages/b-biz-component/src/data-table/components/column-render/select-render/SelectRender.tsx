import React, { FC } from 'react';
import { EFieldType } from '@brick/types';
import { IDataRenderProps } from '../types';
import { RadioRender } from '../radio-render';

export const SelectRender: FC<IDataRenderProps<string, EFieldType.RADIO>> = (props) => {
  return <RadioRender {...props} />;
};
