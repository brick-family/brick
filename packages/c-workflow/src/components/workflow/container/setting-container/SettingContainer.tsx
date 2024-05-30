import { useMemoizedFn } from 'ahooks';
import { Drawer, Form } from 'antd';
import React, { FC, memo } from 'react';
import { useWorkflowAppSelector } from '../../../../processor';

export interface ISettingContainerProps {}

export const SettingContainer: FC<ISettingContainerProps> = memo((props) => {
  const [activeNode, clearActiveNode] = useWorkflowAppSelector((s) => [
    s.activeNode,
    s.clearActiveNode,
  ]);

  const [form] = Form.useForm();

  const onClose = useMemoizedFn(() => {
    clearActiveNode();
  });

  return (
    <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={Boolean(activeNode)}>
      <Form form={form}></Form>
      {/*{JSON.stringify(activeNode?.data)}*/}
    </Drawer>
  );
});
