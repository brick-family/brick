import { SamplePreview } from '@brick/lowcode-editor';
import { ITableEntity } from '@brick/types';
import { useMemoizedFn } from 'ahooks';
import { Button, Drawer, Space } from 'antd';
import React, { FC, memo, useRef } from 'react';
import { useResourcePageSelector } from '../../../resource-page-processor';
import s from './designOperation.less';

export interface IDesignOperationProps {
  onSave: () => Promise<void>;
  getTableData: () => ITableEntity;
}

export const DesignOperation: FC<IDesignOperationProps> = memo((props) => {
  const { onSave, getTableData } = props;

  const tableDataRef = useRef<ITableEntity>();

  const [setOpen, open] = useResourcePageSelector((s) => [
    s.previewProcessor.setOpen,
    s.previewProcessor.open,
  ]);

  const handleSave = async () => {
    await onSave();
  };

  const handlePreview = useMemoizedFn(async () => {
    tableDataRef.current = getTableData();
    setOpen(true);
  });

  return (
    <div>
      <Space>
        <Button onClick={handlePreview}>预览</Button>
        <Button type="primary" onClick={handleSave}>
          保存
        </Button>
      </Space>
      {open && (
        <Drawer
          rootClassName={s.preview}
          title="预览"
          size={'large'}
          placement="bottom"
          onClose={() => setOpen(false)}
          open={open}
          bodyStyle={{ padding: 0 }}
        >
          {/* TODO 调用新的预览 */}
          {tableDataRef.current && <SamplePreview table={tableDataRef.current!} />}
        </Drawer>
      )}
    </div>
  );
});
