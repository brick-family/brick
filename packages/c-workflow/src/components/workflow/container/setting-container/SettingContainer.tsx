import { useMemoizedFn } from 'ahooks';
import { Button, Drawer, Form, Space } from 'antd';
import React, { FC, memo, Suspense, useEffect } from 'react';
import { useWorkflowAppSelector } from '../../../../processor';
import s from './settingContainer.module.less';

export interface ISettingContainerProps {}

export const SettingContainer: FC<ISettingContainerProps> = memo((props) => {
  const [activeNode, clearActiveNode, nodeModule, updateNodeData, nodeMap] = useWorkflowAppSelector(
    (s) => [s.activeNode, s.clearActiveNode, s.nodeModule, s.updateNodeData, s.workflowData.nodeMap]
  );

  const nodeId = activeNode?.id!;

  const [form] = Form.useForm();

  useEffect(() => {
    const values = nodeMap?.[nodeId] || {};
    form.setFieldsValue(values);
  }, [nodeId]);

  const onClose = useMemoizedFn(() => {
    clearActiveNode();
  });

  /**
   * 更新widget
   */
  const onOk = () => {
    const values = form.getFieldsValue();
    updateNodeData({ ...values, id: nodeId });
    onClose();
  };

  const SettingComponent = nodeModule?.[activeNode?.type!]?.settingComponent;

  const Footer = () => {
    return (
      <div className={s.footer}>
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button type={'primary'} onClick={onOk}>
            确定
          </Button>
        </Space>
      </div>
    );
  };

  return (
    <Drawer
      title={activeNode?.name || '设置'}
      placement="right"
      bodyStyle={{
        padding: '24px 0',
      }}
      width={600}
      onClose={onClose}
      open={Boolean(activeNode)}
      footer={<Footer />}
    >
      <Form form={form}>
        <Suspense fallback={<div>Loading...</div>}>
          {SettingComponent && <SettingComponent nodeData={activeNode!} />}
        </Suspense>
      </Form>
    </Drawer>
  );
});
