import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import { Form } from 'antd';
import React, { FC, memo, useEffect, useMemo } from 'react';
import { IRoleEntity } from '@brick/types';
import { useInternalSelector } from '@/pages/admin/address/internal/internal-processor';

export interface ICreateAndUpdateProps {}

export const CreateAndUpdate: FC<ICreateAndUpdateProps> = memo((props) => {
  const [form] = Form.useForm<IRoleEntity>();

  const [modalData, setModalData, requestRoleListAll, saveUpdateModalRole] = useInternalSelector(
    (s) => [
      s.modalProcessor.modalData,
      s.modalProcessor.setModalData,
      s.roleProcessor.requestRoleListAll,
      s.saveUpdateModalRole,
    ]
  );

  const closeModal = useMemoizedFn(() => {
    setModalData({ ...modalData, open: false });
  });

  useEffect(() => {
    if (modalData?.open && modalData?.data) {
      form.setFieldsValue(modalData.data!);
    }
  }, [modalData?.open]);

  const title = useMemo(() => {
    const type = modalData?.type;
    if (type === 'create') {
      return '创建角色';
    }
    if (type === 'update') {
      return '修改角色';
    }
    if (type === 'rename') {
      return `重命名角色`;
    }
  }, [modalData?.type]);

  return (
    <ModalForm
      title={title}
      width={400}
      form={form}
      autoFocusFirstInput
      open={modalData.open}
      modalProps={{
        // afterOpenChange: closeModal,
        destroyOnClose: true,
        onCancel: closeModal,
      }}
      submitTimeout={2000}
      onFinish={async (values: IRoleEntity) => {
        try {
          console.log('q=>update-data', modalData);
          await saveUpdateModalRole({
            id: ['rename', 'update'].includes(modalData.type) ? modalData?.data?.id : undefined,
            ...values,
          });
          await requestRoleListAll();
          closeModal();
        } catch (error) {
          return false;
        }
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
        placeholder="请输入名称"
      />
    </ModalForm>
  );
});
