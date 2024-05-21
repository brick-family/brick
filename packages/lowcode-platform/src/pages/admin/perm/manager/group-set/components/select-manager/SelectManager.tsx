import React, { FC } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TransferSelect, TTransferSelectType } from '@brick/biz-component';
import { useMemoizedFn } from 'ahooks';
import { useAdminPermManagerSelector } from '@/pages/admin/perm/manager/admin-perm-manager-processor';
import { UserLabel } from '@/components/label';

export interface ISelectManagerProps {
  onSuccess?: () => void;
}

export const SelectManager: FC<ISelectManagerProps> = ({ onSuccess }) => {
  const [bindTenantGroup, getTenantGroupUserAppResponse, currTenantGroup] =
    useAdminPermManagerSelector((s) => [
      s.tenantGroupProcessor.bindTenantGroup,
      s.tenantGroupProcessor.getTenantGroupUserAppResponse,
      s.currTenantGroup,
    ]);

  const list = getTenantGroupUserAppResponse.data?.userList;
  const onOk = useMemoizedFn(async (value: string[], type: TTransferSelectType) => {
    return await bindTenantGroup(
      {
        tenantGroupId: currTenantGroup?.id!,
        type: 'user',
        ids: value,
      },
      {
        onSuccess,
      }
    );
  });

  return (
    <div>
      <TransferSelect
        type={'user'}
        onOk={onOk}
        title={'选择用户'}
        targetKeys={list?.map((item) => item.id) || []}
        userTargetData={list}
      >
        {list?.length > 0 ? (
          <Space wrap>
            {list?.map((item) => (
              <UserLabel key={item.id} name={item.name} />
            ))}
          </Space>
        ) : (
          <Button icon={<PlusOutlined />} type={'link'}>
            添加管理员
          </Button>
        )}
      </TransferSelect>
    </div>
  );
};
