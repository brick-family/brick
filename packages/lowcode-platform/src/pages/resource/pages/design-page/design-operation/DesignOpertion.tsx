import { SamplePreview } from '@brick/lowcode-editor';
import { useMemoizedFn } from 'ahooks';
import { Button, Drawer, Space } from 'antd';
import React, { FC, memo } from 'react';
import { useResourcePageSelector } from '../../../resource-page-processor';
import s from './designOperation.less';

export interface IDesignOperationProps {
  onSave: () => Promise<void>;
}

export const DesignOperation: FC<IDesignOperationProps> = memo((props) => {
  const { onSave } = props;
  const [tableData, setOpen, open] = useResourcePageSelector((s) => [
    s.tableData,
    s.previewProcessor.setOpen,
    s.previewProcessor.open,
  ]);

  const handleSave = async () => {
    await onSave();
  };

  const handlePreview = useMemoizedFn(async () => {
    // await saveSchema();
    // await tableProcessor.getTable({ id: resourceId! }, store$);
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
          {tableData && <SamplePreview table={tableData!} />}
        </Drawer>
      )}
    </div>
  );
});
