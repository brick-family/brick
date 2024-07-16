import React, { FC } from 'react';
import { IFieldValue, TFieldValueType } from '../../types';
import { IColumnEntity } from '@brick/types';
import { FieldValueType } from './FieldValueType';
import { FieldValueComponent } from './FieldValueComponent';

export interface IFieldItemProps {
  data: IFieldValue;
  config: IColumnEntity;
}

export const FieldItem: FC<IFieldItemProps> = (props) => {
  const { data, config } = props;

  const handleFieldValueTypeChange = (value: TFieldValueType) => {};

  return (
    <div>
      {config.title}
      <FieldValueType value={data.type} onChange={handleFieldValueTypeChange} />
      <FieldValueComponent config={config} value={data.data} />
    </div>
  );
};
