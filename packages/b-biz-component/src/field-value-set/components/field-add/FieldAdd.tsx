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

  const [addField] = useFieldValueSetSelector((s) => [s.addField]);

  const fields = useFields(tableConfig);

  const items = useMemo(() => {
    return fields?.map((item) => {
      return {
        label: item.title!,
        key: item.id!,
      };
    });
  }, [fields]);

  const handleClick = (info: any) => {
    const { key } = info;
    // const currItem = items?.find(f => f.key === key);
    addField?.(key);
  };

  return (
    <div>
      <Dropdown menu={{ items, onClick: handleClick }}>
        <Button>添加</Button>
      </Dropdown>
    </div>
  );
};
