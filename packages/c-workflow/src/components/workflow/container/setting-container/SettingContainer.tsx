import { useMemoizedFn } from 'ahooks';
import { Button, Drawer, Form, message, Modal, Space } from 'antd';
import React, { FC, memo, Suspense, useEffect, useRef } from 'react';
import { useWorkflowAppSelector } from '../../../../processor';
import s from './settingContainer.module.less';
import { BEditInput } from '@brick/component';

export interface ISettingContainerProps {}

export const SettingContainer: FC<ISettingContainerProps> = memo((props) => {
  const [activeNode, clearActiveNode, nodeModule, updateNodeDataById, nodeMap] =
    useWorkflowAppSelector((s) => [
      s.activeNode,
      s.clearActiveNode,
      s.nodeModule,
      s.updateNodeDataById,
      s?.workflowData.nodeMap,
    ]);
  // 表单值是否有变更
  const formValueIsChange = useRef(false);

  const nodeId = activeNode?.id!;
  const node = nodeMap?.[nodeId] || {};

  const [form] = Form.useForm();

  useEffect(() => {
    if (nodeId) {
      formValueIsChange.current = false;
      form.setFieldsValue(node);
    }

    return () => {
      form.resetFields();
    };
  }, [nodeId]);

  const onFormValuesChange = () => {
    console.log('q=>change');
    formValueIsChange.current = true;
  };

  const onClose = useMemoizedFn(async () => {
    if (formValueIsChange.current) {
      Modal.confirm({
        title: '确定要退出吗？',
        content: '未保存的内容将丢失',
        onOk: () => {
          clearActiveNode();
        },
        onCancel: () => {},
      });

      return;
    }
    clearActiveNode();
  });

  /**
   * 更新widget
   */
  const onOk = async () => {
    try {
      const values = await form.validateFields();

      updateNodeDataById(nodeId, values);
      clearActiveNode();
    } catch (error: any) {
      const errMessage = error?.errorFields?.[0]?.errors?.[0];
      message.error(errMessage);

      return;
    }
  };

  const SettingComponent = nodeModule?.[activeNode?.type!]?.settingComponent;

  const onSave = async (name: string) => {
    updateNodeDataById(nodeId, { name });
    return true;
  };

  const Title = () => {
    return (
      <div style={{ width: '200px' }}>
        <BEditInput name={node?.name || '设置'} onSave={onSave} />
      </div>
    );
  };

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
      classNames={s.drawer}
      title={<Title />}
      placement="right"
      bodyStyle={{
        padding: '24px 0',
      }}
      width={600}
      onClose={onClose}
      open={Boolean(activeNode)}
      footer={<Footer />}
      destroyOnClose
    >
      <Form form={form} onValuesChange={onFormValuesChange}>
        <Suspense fallback={<div>Loading...</div>}>
          {SettingComponent && <SettingComponent nodeData={activeNode!} />}
        </Suspense>
      </Form>
    </Drawer>
  );
});
