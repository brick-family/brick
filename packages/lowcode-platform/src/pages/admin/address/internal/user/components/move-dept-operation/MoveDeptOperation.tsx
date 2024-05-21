import React, { FC } from 'react';
import { TransferSelect, TTransferSelectType } from '@brick/biz-component';
import { Button, message } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import { useInternalSelector } from '@/pages/admin/address/internal/internal-processor';

export interface IMoveDeptOperationProps {
  userIds: string[];
  onSuccess?: () => void;
}

export const MoveDeptOperation: FC<IMoveDeptOperationProps> = ({ userIds, onSuccess }) => {
  const [distributeDept] = useInternalSelector((s) => [s.userProcessor.distributeDept]);
  const onOk = useMemoizedFn(async (value: string[], type: TTransferSelectType) => {
    return await distributeDept(
      {
        userIds: userIds,
        deptIds: value,
      },
      {
        onSuccess,
        onError: () => {
          message.error('操作失败');
        },
      }
    );
  });
  return (
    <div>
      <TransferSelect onOk={onOk} type={'dept'} title={'选择部门'}>
        <Button size={'small'} icon={<UsergroupAddOutlined />} type="text">
          调整部门
        </Button>
      </TransferSelect>
    </div>
  );
};
