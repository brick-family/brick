import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import { Form } from 'antd';
import React, { FC, memo, useEffect, useMemo } from 'react';
import { IDeptEntity } from '@brick/types';
import { useInternalSelector } from '@/pages/admin/address/internal/internal-processor';

export interface ICreateAndUpdateProps {
  // requestListAll: any;
  // saveUpdateModal: any;
}

export const CreateAndUpdateDept: FC<ICreateAndUpdateProps> = memo((props) => {
  const [form] = Form.useForm<IDeptEntity>();

  const [modalData, setModalData, requestListAll, updateDept, createDept] = useInternalSelector(
    (s) => [
      s.modalProcessor.modalData,
      s.modalProcessor.setModalData,
      s.deptProcessor.queryDeptAll,
      s.deptProcessor.updateDept,
      s.deptProcessor.createDept,
    ]
  );

  const closeModal = useMemoizedFn(() => {
    setModalData({ ...modalData, open: false });
  });

  useEffect(() => {
    if (modalData?.open && modalData?.data && modalData.type === 'rename') {
      form.setFieldsValue(modalData.data!);
    }
  }, [modalData?.open]);

  const title = useMemo(() => {
    const type = modalData?.type;
    if (type === 'create') {
      return '添加子部门';
    }
    if (type === 'update') {
      return '修改角色';
    }
    if (type === 'rename') {
      return `重命名部门`;
    }

    if (type === 'addDept') {
      return `为“${modalData?.data?.name}”添加子部门`;
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
      onFinish={async (values: IDeptEntity) => {
        try {
          console.log('q=>update-data', modalData, values);
          if (modalData.type == 'addDept') {
            await createDept({
              pid: modalData?.data?.id!,
              ...values,
            });
          } else {
            await updateDept({
              id: modalData?.data?.id!,
              ...values,
            });
          }
          await requestListAll();
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
