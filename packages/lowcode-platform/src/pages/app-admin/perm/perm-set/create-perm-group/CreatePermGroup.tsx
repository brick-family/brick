import React, { FC, useEffect, useMemo, useRef } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Form } from 'antd';

import { IPermSelectData, PermSelect } from '@brick/biz-component';
import { usePermSelector } from '@/pages/app-admin/perm/perm-processor';
import { EDefaultResourceGroup, IResourcePermEntity } from '@brick/types';
import {
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';

// 权限组数据
const customerTypeData = [
  {
    label: '自定义',
    value: '',
  },
  {
    label: '仅添加数据',
    value: EDefaultResourceGroup.ADD,
  },
  {
    label: '添加和管理本人数据',
    value: EDefaultResourceGroup.ADD_MANAGER_MY,
  },
  {
    label: '添加查看所有数据',
    value: EDefaultResourceGroup.ADD_VIEW_ALL,
  },
  {
    label: '查看所有数据',
    value: EDefaultResourceGroup.VIEW_ALL,
  },
  {
    label: '管理所有数据',
    value: EDefaultResourceGroup.MANAGER_ALL,
  },
];

export interface ICreatePermGroupProps {}

export const CreatePermGroup: FC<ICreatePermGroupProps> = (props) => {
  const [form] = Form.useForm<IResourcePermEntity>();
  const permSelectData = useRef<IPermSelectData>();
  const [currSelectResource, modalData, setModalData, savePermGroup, requestResourcePermList] =
    usePermSelector((s) => [
      s.currSelectResource,
      s.modalData,
      s.setModalData,
      s.savePermGroup,
      s.requestResourcePermList,
    ]);

  const onPermSelectChange = useMemoizedFn((data) => {
    permSelectData.current = data;
  });
  const closeModal = useMemoizedFn(() => {
    setModalData({ ...modalData, open: false });
  });

  useEffect(() => {
    if (modalData?.open && modalData?.data) {
      permSelectData.current = {
        operateCode: modalData?.data?.operateCode!,
        dataCodeIds: modalData?.data?.dataCodeIds,
        fieldPerm: {
          viewFiledIds: modalData?.data?.viewFiledIds,
          editFiledIds: modalData?.data?.editFiledIds,
        },
      };
      form.setFieldsValue(modalData.data!);
    }
  }, [modalData?.open]);

  const title = useMemo(() => {
    const type = modalData?.type;
    if (type === 'create') {
      return '创建权限组';
    }
    if (type === 'update') {
      return '修改权限组';
    }
    if (type === 'copy') {
      return `复制${modalData?.data?.name}权限组`;
    }
  }, [modalData?.type]);

  return (
    <ModalForm
      title={title}
      // width={400}
      form={form}
      autoFocusFirstInput
      open={modalData.open}
      modalProps={{
        // afterOpenChange: closeModal,
        destroyOnClose: true,
        onCancel: closeModal,
      }}
      submitTimeout={2000}
      onFinish={async (values: IResourcePermEntity) => {
        try {
          await savePermGroup({
            id: modalData.type === 'update' ? modalData?.data?.id : undefined,
            ...values,
            resourceId: currSelectResource?.id!,
            operateCode: permSelectData?.current?.operateCode || [],
            viewFiledIds: permSelectData?.current?.fieldPerm?.viewFiledIds || [],
            editFiledIds: permSelectData?.current?.fieldPerm?.editFiledIds || [],
          });
          await requestResourcePermList();
          closeModal();
        } catch (error) {
          return false;
        }

        // setOpen(false);
      }}
    >
      <ProFormText
        name={['name']}
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

      <ProFormTextArea name={['description']} label="描述" placeholder="请输入描述" />

      <ProFormSelect
        name={['systemCode']}
        label="成员权限"
        placeholder={'请选择成员权限'}
        request={async () => customerTypeData}
      ></ProFormSelect>
      <ProFormDependency name={['systemCode']}>
        {({ systemCode }) => {
          if (systemCode === '') {
            return (
              <PermSelect
                data={permSelectData.current}
                onChange={onPermSelectChange}
                resourceEntity={currSelectResource}
              />
            );
          }
        }}
      </ProFormDependency>
    </ModalForm>
  );
};
