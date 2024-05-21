import { ITenantGroupEntity } from '@brick/types';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import { Form } from 'antd';
import React, { FC, memo, useEffect, useMemo } from 'react';
import { useAdminPermManagerSelector } from '../../../admin-perm-manager-processor';

export interface ICreateAndUpdateProps {}

export const CreateAndUpdate: FC<ICreateAndUpdateProps> = memo((props) => {
  const [form] = Form.useForm<ITenantGroupEntity>();
  const [modalData, setModalData, saveModalTenantGroup, getAll] = useAdminPermManagerSelector(
    (s) => [
      s.modalProcessor.modalData,
      s.modalProcessor.setModalData,
      s.saveModalTenantGroup,
      s.tenantGroupProcessor.getAll,
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
      return '创建管理组';
    }
    if (type === 'update') {
      return '修改管理组';
    }
    if (type === 'rename') {
      return `重命名权限组`;
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
      onFinish={async (values: ITenantGroupEntity) => {
        try {
          console.log('q=>update-data', modalData);
          await saveModalTenantGroup({
            id: ['rename', 'update'].includes(modalData.type) ? modalData?.data?.id : undefined,
            ...values,
          });
          await getAll();
          closeModal();
        } catch (error) {
          return false;
        }
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
    </ModalForm>
  );
});
