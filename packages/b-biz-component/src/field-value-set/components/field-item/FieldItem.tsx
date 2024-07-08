import React, { FC } from 'react';
import { IFieldValue } from '../../types';
import { IColumnEntity } from '@brick/types';

export interface IFieldItemProps {
  data: IFieldValue;
  config: IColumnEntity;
}

export const FieldItem: FC<IFieldItemProps> = (props) => {
  const { data, config } = props;
  return <div></div>;
};
