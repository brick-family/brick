import { IColumnEntity, ITableEntity } from '@brick/types';
import { Button, Dropdown } from 'antd';

import React, { FC, useMemo } from 'react';
import { useFields } from '../../../hooks';
import { useFieldValueSetSelector } from '../../processor';

export interface IFieldAddProps {
  tableConfig: ITableEntity;

  values?: IColumnEntity['id'][];
}

export const FieldAdd: FC<IFieldAddProps> = (props) => {
  const { tableConfig } = props;

  const [addField, value] = useFieldValueSetSelector((s) => [s.addField, s.value]);

  const fields = useFields(tableConfig, { excludeSystem: true });

  const items = useMemo(() => {
    const result: any = [];

    fields?.forEach((item) => {
      if (!value.find((f) => f.fieldId === item.id)) {
        result.push({
          label: item.title!,
          key: item.id!,
        });
      }
    });
    return result;
  }, [fields, value?.length]);

  const handleClick = (info: any) => {
    const { key } = info;
    // const currItem = items?.find(f => f.key === key);
    addField?.(key);
  };

  return (
    <div>
      <Dropdown placement={'topLeft'} menu={{ items, onClick: handleClick }}>
        <Button type={'primary'}>添加</Button>
      </Dropdown>
    </div>
  );
};
