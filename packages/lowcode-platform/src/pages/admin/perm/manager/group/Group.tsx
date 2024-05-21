import React, { FC, useEffect } from 'react';
import s from './group.less';
import { BGroup, BSpin } from '@brick/component';
import { useAdminPermManagerSelector } from '@/pages/admin/perm/manager/admin-perm-manager-processor';
import { MenuList } from '@/components';
import { CreateAndUpdate } from './settings/create-and-update';
import { useGroupSettingMenu } from '@/pages/admin/perm/manager/group/hooks';
import { useMemoizedFn } from 'ahooks';

export interface IGroupProps {}

export const Group: FC<IGroupProps> = (props) => {
  const [
    getAll,
    tenantGroupListResponse,
    tenantGroupListNoSystem,
    systemTenantGroup,
    setModalData,
    currTenantGroup,
    setCurrTenantGroup,
    setCurrSystemTenantGroup,
  ] = useAdminPermManagerSelector((s) => [
    s.tenantGroupProcessor.getAll,
    s.tenantGroupProcessor.tenantGroupListResponse,
    s.tenantGroupProcessor.tenantGroupListNoSystem,
    s.tenantGroupProcessor.systemTenantGroup,
    s.modalProcessor.setModalData,
    s.currTenantGroup,
    s.setCurrTenantGroup,
    s.setCurrSystemTenantGroup,
  ]);

  const settingMenu = useGroupSettingMenu();

  useEffect(() => {
    getAll();
  }, []);

  const handleAdd = () => {
    setModalData({
      type: 'create',
      open: true,
      data: {},
    });
  };

  const handleClick = () => {
    setCurrSystemTenantGroup();
  };

  const onSelect = useMemoizedFn((keys, info) => {
    if (keys?.[0]) {
      setCurrTenantGroup(info?.selectedNodes?.[0]);
    }
  });

  return (
    <div className={s.group}>
      <BGroup title={'系统管理组'}>
        <BGroup.Item
          title={'系统管理员'}
          active={currTenantGroup?.isSystem === 1}
          onClick={setCurrSystemTenantGroup}
        />
      </BGroup>
      <BGroup
        style={{ marginTop: 10, flex: 1, overflow: 'auto' }}
        title={'普通管理组'}
        isAdd
        onAddClick={handleAdd}
      >
        <>
          {tenantGroupListResponse.loading && <BSpin />}
          <MenuList
            data={tenantGroupListNoSystem as any}
            // renderItemSetting={renderItemSetting}
            selectedKeys={[currTenantGroup?.id!]}
            settingMenu={settingMenu}
            onSelect={onSelect}
            isDirectory={false}
            isOnlyOneLevel={true}
            isDraggable={false}
          />
        </>
      </BGroup>
      <CreateAndUpdate />
    </div>
  );
};
