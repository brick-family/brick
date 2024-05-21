import React, { FC, useRef } from 'react';
import { message } from 'antd';

import { createResource, queryResourceGroup } from '@brick/services';
import { arrayToTree } from '@brick/utils';
import {
  ModalForm,
  ProFormInstance,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { useSliderSelector } from '../../processor';

export interface ICreateGroupProps {}

export const CreateGroup: FC<ICreateGroupProps> = React.memo((props) => {
  const { aId } = useParams();
  const formRef = useRef<ProFormInstance>();

  const [modalData, setModalData, refresh] = useSliderSelector((s) => [
    s.modalProcessor?.modalData,
    s.modalProcessor?.setModalData,
    s.resourceProcessor.refresh,
  ]);

  const onOpenChange = (open: boolean) => {
    setModalData({
      ...modalData,
      open: open,
    });
  };

  return (
    <ModalForm
      title="新建分组"
      width={400}
      open={modalData.open}
      formRef={formRef}
      autoFocusFirstInput
      onOpenChange={onOpenChange}
      modalProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await createResource({
          applicationId: aId,
          title: values.title,
          resourceType: 'GROUP',
          parentId: values.parentId,
        });
        message.success('分组创建成功！');

        // 关闭弹框
        // setCreateGroupOpen(false);
        // 刷新列表数据
        refresh();
        return true;
      }}
    >
      <ProFormText
        name="title"
        label="分组名称"
        rules={[{ required: true, message: '分组名称必填' }]}
        // tooltip="最长为 24 位"
        placeholder="请输入分组"
      />
      <ProFormTreeSelect
        name="parentId"
        label="选择分组"
        // tooltip="最长为 24 位"
        placeholder="请选择分组"
        fieldProps={{
          // labelInValue: true,
          fieldNames: {
            label: 'title',
            value: 'id',
          },
        }}
        request={async () => {
          const tableGroup = await queryResourceGroup({ pageSize: 1000, currentPage: 1 });
          const tree = arrayToTree(tableGroup, 'id', 'parentId');
          if (modalData.data?.id) {
            formRef.current?.setFieldsValue({
              parentId: modalData.data.id,
            });
          }
          return tree;
        }}
      />
    </ModalForm>
  );
});
