import { Field } from '@douyinfe/semi-ui/lib/es/form';
import React, { FC } from 'react';
import { useFieldValueSetSelector } from 'src/field-value-set/processor';
import { FieldItem } from '../field-item';

export interface IFieldListProps {}

export const FieldList: FC<IFieldListProps> = (props) => {
  const [tableConfig, value] = useFieldValueSetSelector((s) => [s.tableConfig, s.value]);

  return (
    <div>
      {value?.map((item) => {
        return <FieldItem data={item} />;
      })}
    </div>
  );
};
