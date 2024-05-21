import React, { FC, memo, useEffect, useMemo, useRef } from 'react';

import { MenuList } from '@/components';
import { useInternalSelector } from '../internal-processor';
import s from './role.less';
import { useMemoizedFn } from 'ahooks';
import { BGroup } from '@brick/component';
import { useRoleSettingMenu } from '@/pages/admin/address/internal/hooks';
import { CreateAndUpdate } from '@/pages/admin/address/internal/role/settings';

export interface IRoleProps {}

export const Role: FC<IRoleProps> = memo((props) => {
  // 角色selector
  const [requestRoleListAll, roleList, selectData, setSelectData, setModalData] =
    useInternalSelector((s) => [
      s.roleProcessor.requestRoleListAll,
      s.roleProcessor.roleList,
      s.selectData,
      s.setSelectData,
      s.modalProcessor.setModalData,
    ]);

  const createRef = useRef<any>();
  const settingMenu = useRoleSettingMenu();
  useEffect(() => {
    // 请求角色列表
    requestRoleListAll();
  }, []);

  useEffect(() => {
    const curr = roleList.data?.[0];
    if (curr) {
      setSelectData({
        id: curr.id!,
        name: curr.name,
      });
    }
  }, [roleList.data]);

  const roleItems = useMemo(() => {
    if (roleList.data) {
      return roleList?.data?.map?.((item) => ({
        key: item.id!,
        ...item,
        title: item.name,
        isLeaf: true, // 设置叶子节点
      }));
    }
  }, [roleList.data]);

  const onSelect = useMemoizedFn((keys, info) => {
    if (keys?.[0]) {
      setSelectData({
        id: keys?.[0],
        name: info?.selectedNodes?.[0]?.title,
      });
    }
  });

  const onAddClick = () => {
    setModalData({
      type: 'create',
      open: true,
      data: {},
    });
  };

  return (
    <div className={s.role}>
      <CreateAndUpdate />
      <BGroup
        style={{ overflow: 'hidden' }}
        contentStyle={{ overflow: 'auto' }}
        title={'创建的角色'}
        isAdd
        onAddClick={onAddClick}
      >
        <MenuList
          selectedKeys={[selectData?.id]}
          onSelect={onSelect}
          data={roleItems! as any}
          settingMenu={settingMenu}
          isDirectory={false}
          isOnlyOneLevel={true}
        />
      </BGroup>
    </div>
  );
});
