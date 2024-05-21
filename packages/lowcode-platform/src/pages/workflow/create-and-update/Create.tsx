import React, { FC } from 'react';
import { EWorkflowType, IWorkflowEntity } from '@brick/types';
import { CheckCard, ModalForm, ProFormText } from '@ant-design/pro-components';
import { Avatar, Form } from 'antd';
import { useWorkflowPageSelector } from '@/pages/workflow/workflow-processor';
import { useMemoizedFn } from 'ahooks';
import { BIcon } from '@brick/component';
import { BizTableProFormSelect } from '@brick/biz-component';

import s from './create.less';
import { getAppId } from '@brick/utils';

export const TypeData: Array<{
  id: number;
  title: string;
  description: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}> = [
  {
    id: EWorkflowType.table,
    title: '表单事件触发',
    description: '指定的表单或流程事件触发',
  },
  {
    id: EWorkflowType.timing,
    title: '定时触发',
    description: '按照设定的时间周期循环触发流程',
  },
  {
    id: EWorkflowType.button,
    title: '自定义按钮',
    description: '自定义按钮触发',
    disabled: true,
  },
];

export interface ICreateProps {}

export const Create: FC<ICreateProps> = (props) => {
  const [form] = Form.useForm<IWorkflowEntity>();
  const [modalData, setModalData, saveAndUpdateWorkflow, refreshWorkflowAll] =
    useWorkflowPageSelector((s) => [
      s.modalProcessor.modalData,
      s.modalProcessor.setModalData,
      s.saveAndUpdateWorkflow,
      s.workflowProcessor.refresh,
    ]);

  const closeModal = useMemoizedFn(() => {
    setModalData({ ...modalData, open: false });
  });

  return (
    <>
      <ModalForm
        title={'创建'}
        width={600}
        form={form}
        autoFocusFirstInput
        open={modalData.open}
        modalProps={{
          // afterOpenChange: closeModal,
          destroyOnClose: true,
          onCancel: closeModal,
        }}
        submitTimeout={2000}
        onFinish={async (values: IWorkflowEntity) => {
          try {
            console.log('q=>update-data', values);
            await saveAndUpdateWorkflow({
              id: ['update'].includes(modalData.type) ? modalData?.data?.id : undefined,
              ...values,
              applicationId: getAppId(),
            });
            await refreshWorkflowAll();
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
          placeholder="请输入名称"
        />

        <Form.Item
          name="type"
          label="请选择触发类型"
          rules={[
            {
              required: true,
              message: '请选择触发类型！',
            },
          ]}
        >
          <CheckCard.Group className={s.selectType} style={{ width: '100%' }}>
            {TypeData.map((item) => {
              return (
                <CheckCard
                  key={item.id}
                  title={item.title}
                  disabled={item.disabled}
                  avatar={<Avatar icon={<BIcon type={'icon-jurassic_form'} />} />}
                  description={item.description}
                  value={item.id}
                />
              );
            })}
          </CheckCard.Group>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {(form) => {
            const type = form.getFieldValue('type');
            if (type == EWorkflowType.table) {
              return <BizTableProFormSelect name={'refId'} />;
            }
            return null;
          }}
        </Form.Item>
      </ModalForm>
    </>
  );
};
