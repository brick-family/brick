import { EFieldType, IDataEntity } from '@brick/types';
import React, { FC } from 'react';
import { IDataRenderProps } from '../types';

export const RelationRender: FC<IDataRenderProps<IDataEntity, EFieldType.RELATION>> = (props) => {
  const labelFieldId = props.column?.columnConfig?.labelFieldId || 'id';
  return <div>{props.value?.map?.((item: any) => item[labelFieldId])?.join(',')}</div>;
};
