import React, { FC, memo, useEffect } from 'react';
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { CreateOrUpdateType, IUserEntity } from '@brick/types';
import { Form, message } from 'antd';
import { createUser, updateUser } from '@brick/services';

export interface ICreateOrUpdateProps {
  open: boolean;
  type: CreateOrUpdateType;
  onClose?: () => void;
  onSuccess?: () => void;
  user?: IUserEntity;
}

export const CreateOrUpdate: FC<ICreateOrUpdateProps> = memo(
  ({ open, type, onClose, user, onSuccess }) => {
    const [form] = Form.useForm<IUserEntity>();
    console.log('q=>updateUsr', user);
    useEffect(() => {
      if (open) {
        form.setFieldsValue(user!);
      }
    }, [open]);
    return (
      <ModalForm
        title={type === 'create' ? '新增用户' : '编辑用户'}
        width={600}
        open={open}
        form={form}
        layout={'horizontal'}
        labelCol={{ span: 4, offset: 2 }}
        wrapperCol={{ span: 15 }}
        // autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => onClose?.(),
        }}
        submitTimeout={2000}
        onFinish={async (values: IUserEntity) => {
          let request = createUser;
          if (type === 'update') {
            request = updateUser;
          }
          const result = await request({ ...user, ...values });
          if (result) {
            message.success('提交成功');
            onSuccess?.();
            onClose?.();
            return true;
          }
          return false;
        }}
      >
        <ProFormText
          name="name"
          label="登录用户名"
          rules={[
            {
              required: true,
              message: '用户名必填',
            },
          ]}
          fieldProps={{
            disabled: type == 'update',
          }}
          placeholder="请输入用户名"
        />
        {type === 'create' && (
          <ProFormText.Password
            label="密码"
            name="password"
            placeholder="请输入密码"
            rules={[{ required: true, message: '密码必填' }]}
          />
        )}
        <ProFormText
          name="realName"
          label="姓名"
          placeholder="请输入姓名"
          rules={[
            {
              required: true,
              message: '姓名必填',
            },
          ]}
        />

        <ProFormText
          name="email"
          label="邮箱"
          key={'email'}
          placeholder="请输入邮箱"
          rules={[
            {
              pattern:
                /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
              message: '请输入正确的邮箱',
            },
          ]}
        />
        <ProFormText
          name="phoneNumber"
          label="手机号"
          placeholder="请输入手机号"
          rules={[
            {
              pattern: /^1[3456789]{1}\d{9}$/,
              message: '请输入正确的手机号',
            },
          ]}
        />
        <ProFormRadio.Group
          name="status"
          label="状态"
          options={[
            {
              label: '启用',
              value: 1,
            },
            {
              label: '禁用',
              value: 2,
            },
          ]}
        />
      </ModalForm>
    );
  }
);
