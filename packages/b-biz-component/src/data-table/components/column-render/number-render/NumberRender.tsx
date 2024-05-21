import React, { FC } from 'react';
import { IDataRenderProps } from '../types';
import { EFieldType } from '@brick/types';

export const NumberRender: FC<IDataRenderProps<string, EFieldType.DECIMAL>> = ({
  value,
  column,
}) => {
  // if (column.columnConfig.decimalPlace)
  return <div>{value}</div>;
};
