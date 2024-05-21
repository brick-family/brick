import { ProFormIconSelect } from '@brick/biz-component';
import { useGlobalSelector } from '@/global-processor';
import { useMainSelector } from '@/pages/main/main-processor';
import { IAppEntity } from '@brick/types';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import React, { FC, useEffect, useState } from 'react';

export interface IUpdateAppProps {
  children?: React.ReactElement;
  data: IAppEntity;
}

export const UpdateApp: FC<IUpdateAppProps> = (props) => {
  const [form] = Form.useForm<IAppEntity>();

  const [open, setOpen] = useState(false);
  const updateApp = useMainSelector((s) => s.updateApp);
  const currTenant = useGlobalSelector((s) => s.currTenant);
  useEffect(() => {
    if (open) {
      form.setFieldsValue(props.data);
    }
  }, [open]);

  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <div onClick={handleClick}>{props.children || <Button type="primary">update</Button>}</div>
      <ModalForm
        title="修改应用"
        width={400}
        open={open}
        form={form}
        autoFocusFirstInput
        modalProps={{
          afterOpenChange: setOpen,
          destroyOnClose: true,
          onCancel: () => setOpen(false),
        }}
        submitTimeout={2000}
        onFinish={async (values: IAppEntity) => {
          try {
            await updateApp({
              ...props.data,
              ...values,
              tenantId: currTenant.id!,
            });
          } catch (error) {
            return false;
          }

          setOpen(false);
        }}
      >
        <ProFormText
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: '请输入名称！',
            },
          ]}
          // tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormIconSelect
          name={['extraParam', 'icon']}
          label="图标"
          rules={[
            {
              required: true,
              message: '请输入名称！',
            },
          ]}
          fieldProps={{ type: 'app', defaultSelectFirst: false }}
          mode="edit"
        />
        <ProFormTextArea
          name={['extraParam', 'description']}
          label="描述"
          placeholder="请输入名称"
        />
      </ModalForm>
    </>
  );
};
