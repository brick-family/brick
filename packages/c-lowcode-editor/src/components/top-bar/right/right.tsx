import React, { FC } from 'react';
import { Button, Drawer, Space } from 'antd';
import { useMemoizedFn } from 'ahooks';
import styles from './right.less';
import { SamplePreview, useLowcodeEditorSelector } from '@brick/lowcode-editor';

export interface IRightProps {}

export const Right: FC<IRightProps> = (props) => {
  const [tableData, saveSchema, setOpen, open] = useLowcodeEditorSelector((s) => [
    s.tableData,
    s.saveSchema,
    s.previewProcessor.setOpen,
    s.previewProcessor.open,
  ]);

  // const open = previewProcessor.open.get();

  // console.log('q=>tableData', tableData);
  const handleSave = async () => {
    saveSchema();
  };
  const handlePreview = useMemoizedFn(async () => {
    await saveSchema();
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
          rootClassName={styles.preview}
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
};
