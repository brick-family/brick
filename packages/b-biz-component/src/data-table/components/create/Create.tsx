import React, { FC } from 'react';
import { Button } from 'antd';
import { useDataTableSelector } from '../../processor';
import { EOpenType } from '@brick/biz-component';

export interface ICreateProps {}

export const Create: FC<ICreateProps> = (props) => {
  const [tableId, itemDetailProcessor] = useDataTableSelector((s) => [
    s.tableId,
    s.itemDetailProcessor,
  ]);

  const handleAdd = () => {
    itemDetailProcessor?.open({
      openType: EOpenType.modal,
      mode: 'create',
      tableId: tableId as unknown as string,
    });
  };
  return (
    <Button type="primary" onClick={handleAdd}>
      添加
    </Button>
  );
};
