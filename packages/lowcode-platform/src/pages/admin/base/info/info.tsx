import React, { FC, useEffect } from 'react';
import s from './info.less';
import { ProCard, ProForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import { Form, message, UploadProps } from 'antd';
import { ITenantUserEntity } from '@brick/types';
import { useGlobalSelector } from '@/global-processor';
import { getAntdFilesByTenantFile, getFileIdByAntdFiles, getRequestHeader } from '@brick/utils';
import { PlusOutlined } from '@ant-design/icons';
import { uploadTenantFile, getTenantUser, updateTenantUser } from '@brick/services';

export interface IInfoProps {}

export const Info: FC<IInfoProps> = (props) => {
  const [tenant, setCurrTenant] = useGlobalSelector((s) => [s.currTenant, s.setCurrTenant]);
  const [form] = Form.useForm<ITenantUserEntity>();

  useEffect(() => {
    if (tenant) {
      const currData = { ...tenant } as any;
      currData.logo = getAntdFilesByTenantFile(tenant?.logoFile!);
      form.setFieldsValue(currData);
    }
  }, [tenant]);

  const customRequest: UploadProps['customRequest'] = async (props) => {
    const { onError, onSuccess, file, data, filename } = props;
    console.log('q=>customRequest', file);
    try {
      const res = await uploadTenantFile({
        file: file,
      });
      onSuccess?.(res);
    } catch (e: any) {
      console.error('logo file upload', e);
      onError?.(e);
    }
  };

  return (
    <ProCard>
      <div className={s.info}>
        <ProForm
          form={form}
          style={{ width: '100%' }}
          autoFocusFirstInput
          // submitTimeout={2000}
          grid={false}
          // 配置按钮的属性
          submitter={{
            searchConfig: {
              submitText: '保存',
            },
            resetButtonProps: {
              style: {
                // 隐藏重置按钮
                display: 'none',
              },
            },
          }}
          colProps={{ md: 12, xl: 8 }}
          onFinish={async (values: ITenantUserEntity) => {
            console.log('q=>values', values);

            const data = {
              ...values,
              id: tenant.id,
            };
            const fileId = getFileIdByAntdFiles(values?.logo as any);
            if (fileId) {
              data.logo = fileId;
            }
            const res = await updateTenantUser(data);
            if (res) {
              const getData = await getTenantUser(tenant.id!);
              setCurrTenant(getData);
              message.success('修改成功');
            }
            // setOpen(false);
            // return true;
          }}
        >
          <ProFormUploadButton
            name="logo"
            label="企业图标"
            max={1}
            fieldProps={{
              headers: getRequestHeader(),
              name: 'file',
              listType: 'picture-card',
              customRequest,
            }}
          >
            <PlusOutlined />
          </ProFormUploadButton>

          <ProFormText
            name="name"
            label="企业名称"
            rules={[
              {
                required: true,
                message: '请输入名称！',
              },
            ]}
            placeholder="请输入名称"
          />

          {/*<ProFormText*/}
          {/*  name="name"*/}
          {/*  label="主题色"*/}
          {/*  rules={[*/}
          {/*    {*/}
          {/*      required: true,*/}
          {/*      message: '请输入名称！',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  placeholder="请输入名称"*/}
          {/*/>*/}

          {/* <ProFormText
        name="name"
        label="布局方式"
        rules={[
          {
            required: true,
            message: '请输入名称！',
          },
        ]}
        placeholder="请输入名称"
      /> */}
        </ProForm>
      </div>
    </ProCard>
  );
};

export default Info;
