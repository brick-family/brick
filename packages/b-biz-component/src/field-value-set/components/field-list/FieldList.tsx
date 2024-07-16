import React, { FC } from 'react';
import { FieldItem } from '../field-item';
import { useFieldValueSetSelector } from '../../processor/FieldValueSetProvider';

export interface IFieldListProps {}

export const FieldList: FC<IFieldListProps> = (props) => {
  const [tableConfig, value, columnsMap] = useFieldValueSetSelector((s) => [
    s.tableConfig,
    s.value,
    s.columnsMap,
  ]);

  console.log('value-field', value);

  return (
    <div>
      {value?.map((item) => {
        const config = columnsMap?.[item?.fieldId];
        return <FieldItem config={config} data={item} />;
      })}
    </div>
  );
};
