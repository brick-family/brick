import React, { FC } from 'react';
import { FieldItem } from '../field-item';
import { useFieldValueSetSelector } from '../../processor/FieldValueSetProvider';
import s from './fieldList.module.less';

export interface IFieldListProps {}

export const FieldList: FC<IFieldListProps> = (props) => {
  const [tableConfig, value, columnsMap, setValue] = useFieldValueSetSelector((s) => [
    s.tableConfig,
    s.value,
    s.columnsMap,
    s.setValue,
  ]);

  return (
    <div>
      {value?.map((item) => {
        const config = columnsMap?.[item?.fieldId];
        if (!config) {
          return <></>;
        }
        return <FieldItem className={s.item} key={item.fieldId} config={config} data={item} />;
      })}
    </div>
  );
};
