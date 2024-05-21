import { ProFormIconSelect } from '@brick/biz-component';
import { useGlobalSelector } from '@/global-processor';
import { useMainSelector } from '@/pages/main/main-processor';
import { IAppEntity } from '@brick/types';
import { FileExcelOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, Form, message, Space, Tooltip } from 'antd';
import React, { FC } from 'react';

export interface ICreateProps {}

export const Create: FC<ICreateProps> = (props) => {
  const [createApp] = useMainSelector((s) => [s.createApp]);
  const currTenant = useGlobalSelector((s) => s.currTenant);

  const [form] = Form.useForm<IAppEntity>();

  return (
    <>
      <Space size={20}>
        <ModalForm
          title="新建应用"
          width={400}
          trigger={
            <Button icon={<PlusCircleOutlined />} type="primary">
              创建空白应用
            </Button>
          }
          form={form}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          submitTimeout={2000}
          onFinish={async (values: IAppEntity) => {
            console.log('q=>values', values);
            await createApp({
              ...values,
              dbKey: 'applicationDataSource1',
              url: 'http:127.0.0.12',
              tenantId: currTenant.id!,
            });

            message.success('提交成功');
            return true;
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
            fieldProps={{ type: 'app' }}
            mode="edit"
          />
          <ProFormTextArea
            name={['extraParam', 'description']}
            label="描述"
            placeholder="请输入名称"
          />
        </ModalForm>

        <Tooltip title="敬请期待">
          <Button disabled icon={<FileExcelOutlined />}>
            从Excel创建应用
          </Button>
        </Tooltip>
      </Space>
    </>
  );
};
