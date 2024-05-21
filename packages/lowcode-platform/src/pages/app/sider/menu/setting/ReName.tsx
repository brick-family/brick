import React, { FC, useEffect, useRef } from 'react';
import { useMemoizedFn } from 'ahooks';
import { message } from 'antd';

import { EModalFormSize } from '@/components/utils/common';
import { useSliderSelector } from '@/pages/app/sider/processor';
import { useUpdateResource } from '@brick/services';
import { IResourceEntity, TMenuData } from '@brick/types';
import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { useParams } from '@umijs/max';

/**
 * 重命名弹框组件
 */
export interface IReNameProps extends Pick<ModalFormProps, 'open' | 'onOpenChange'> {
  data: TMenuData<IResourceEntity>;
  // queryResourceResult?: UseQueryResult<ITableEntity[], unknown>
}

export const ReName: FC<IReNameProps> = (props) => {
  const { onOpenChange, open, data } = props;
  const formRef = useRef<ProFormInstance>();
  const { aId } = useParams();

  const promiseRef = useRef<{
    resolve: (value: unknown) => void;
    reject: (reason: unknown) => void;
  }>({} as any);

  const [refresh] = useSliderSelector((s) => [s.resourceProcessor.refresh]);

  const onSuccess = useMemoizedFn(async () => {
    promiseRef.current?.resolve?.(true);
    refresh();
    message.success('修改成功');
  });
  const mutation = useUpdateResource({
    onSuccess,
    onError: (err: any) => {
      promiseRef.current?.reject?.(err);
    },
  });
  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        title: data.title,
      });
    }
  }, [open]);
  return (
    <ModalForm
      title="修改名称"
      open={open}
      formRef={formRef}
      width={EModalFormSize.small}
      onOpenChange={onOpenChange}
      submitTimeout={2000}
      onFinish={async (values) => {
        try {
          mutation.mutate({
            title: values.title,
            id: data.id as unknown as string,
            resourceType: data.resourceType,
            applicationId: aId, // TODO 可以去掉
          });

          await new Promise((resole, reject) => {
            promiseRef.current.reject = reject;
            promiseRef.current.resolve = resole;
          });
          return true;
        } catch (error) {
          return false;
        }
      }}
    >
      <ProFormText
        rules={[{ required: true, message: '分组名称必填' }]}
        name="title"
        label="名称"
      />
    </ModalForm>
  );
};
