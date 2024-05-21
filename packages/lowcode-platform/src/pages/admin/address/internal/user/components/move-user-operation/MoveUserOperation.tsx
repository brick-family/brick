import React, { FC } from 'react';
import { TransferSelect, TTransferSelectType } from '@brick/biz-component';
import { Button, message } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import { useInternalSelector } from '@/pages/admin/address/internal/internal-processor';

export interface IMoveUserOperationProps {
  roleIds: string[];
  onSuccess?: () => void;
}

export const MoveUserOperation: FC<IMoveUserOperationProps> = ({ roleIds, onSuccess }) => {
  const [distributeRole] = useInternalSelector((s) => [s.userProcessor.distributeRole]);
  const onOk = useMemoizedFn(async (value: string[], type: TTransferSelectType) => {
    return await distributeRole(
      {
        userIds: value,
        roleIds: roleIds,
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
      <TransferSelect onOk={onOk} type={'role'} title={'选择角色'}>
        <Button>分配用户</Button>
      </TransferSelect>
    </div>
  );
};
