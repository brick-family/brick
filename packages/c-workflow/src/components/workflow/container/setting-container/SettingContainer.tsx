import { useMemoizedFn } from 'ahooks';
import { Drawer, Form } from 'antd';
import React, { FC, memo, Suspense } from 'react';
import { useWorkflowAppSelector } from '../../../../processor';

export interface ISettingContainerProps {}

export const SettingContainer: FC<ISettingContainerProps> = memo((props) => {
  const [activeNode, clearActiveNode, nodeModule] = useWorkflowAppSelector((s) => [
    s.activeNode,
    s.clearActiveNode,
    s.nodeModule,
  ]);

  const [form] = Form.useForm();

  const onClose = useMemoizedFn(() => {
    clearActiveNode();
  });

  const SettingComponent = nodeModule?.[activeNode?.type!]?.settingComponent;

  return (
    <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={Boolean(activeNode)}>
      <Form form={form}>
        <Suspense fallback={<div>Loading...</div>}>
          {SettingComponent && <SettingComponent />}
        </Suspense>
      </Form>
    </Drawer>
  );
});
