import React, { FC, useEffect, useState } from 'react';
import { Button, Flex, Space, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import s from './selectApp.less';
import { useAdminPermManagerSelector } from '@/pages/admin/perm/manager/admin-perm-manager-processor';
import { TransferSelect, TTransferSelectType } from '@brick/biz-component';
import { useMemoizedFn } from 'ahooks';
import { AppLabel } from '@/components/label';
import { ETenantGroupOperatorCode } from '@brick/types';

export interface ISelectAppProps {
  onSuccess?: () => void;
}

export const SelectApp: FC<ISelectAppProps> = ({ onSuccess }) => {
  const [currTenantGroup, bindTenantGroup, getTenantGroupUserAppResponse, updateTenantGroup] =
    useAdminPermManagerSelector((s) => [
      s.currTenantGroup,
      s.tenantGroupProcessor.bindTenantGroup,
      s.tenantGroupProcessor.getTenantGroupUserAppResponse,
      s.tenantGroupProcessor.updateTenantGroup,
    ]);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(Boolean(currTenantGroup?.operateCode?.length));
  }, [currTenantGroup?.operateCode]);
  const list = getTenantGroupUserAppResponse.data?.appList;

  // 权限变更
  const onChange = async (checked: boolean) => {
    const operateCode = checked
      ? [ETenantGroupOperatorCode.CREATE, ETenantGroupOperatorCode.DELETE]
      : [];
    const result = await updateTenantGroup({
      id: currTenantGroup?.id!,
      operateCode: operateCode,
    });

    if (result) {
      setChecked(checked);
    }
  };
  const onOk = useMemoizedFn(async (value: string[], type: TTransferSelectType) => {
    return await bindTenantGroup(
      {
        tenantGroupId: currTenantGroup?.id!,
        type: 'app',
        ids: value,
      },
      {
        onSuccess,
      }
    );
  });

  if (currTenantGroup?.isSystem === 1) {
    return (
      <Flex gap="middle" align="start" vertical>
        <div className={s.switch}>
          <span>具备对所有应用的管理权限</span>
        </div>
      </Flex>
    );
  }

  return (
    <Flex gap="middle" align="start" vertical>
      <TransferSelect
        targetKeys={list?.map((item) => item.id) || []}
        type={'app'}
        onOk={onOk}
        title={'选择应用'}
      >
        {list?.length > 0 ? (
          <Space wrap>
            {list?.map((item) => (
              <AppLabel key={item.id} name={item.name} />
            ))}
          </Space>
        ) : (
          <Button icon={<PlusOutlined />} type={'link'}>
            选择可编辑的应用
          </Button>
        )}
      </TransferSelect>
      <div className={s.switch}>
        <span>可添加／删除应用</span>
        <Switch style={{ marginLeft: 10 }} checked={checked} onChange={onChange} />
      </div>
    </Flex>
  );
};
