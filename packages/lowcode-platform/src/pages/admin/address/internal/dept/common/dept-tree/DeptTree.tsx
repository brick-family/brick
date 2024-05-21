import React, { FC, useEffect } from 'react';
import { getTenantId } from '@brick/utils';
import { MenuList } from '@/components';
import { DownOutlined } from '@ant-design/icons';
import { useInternalSelector } from '../../../internal-processor';
import { useMemoizedFn } from 'ahooks';
import { useDeptMenuSetting } from '../hooks';
import { sortDept } from '@brick/services';
import { CreateAndUpdateDept } from './settings/create-and-update';

interface IDeptTreeProps {}

export const DeptTree: FC<IDeptTreeProps> = (props) => {
  const [deptTree, queryDeptAll, deptSelectData, setDeptSelectData] = useInternalSelector((s) => [
    s.deptProcessor?.deptTree,
    s.deptProcessor.queryDeptAll,
    s.selectData,
    s.setSelectData,
  ]);

  const onDragEnd = useMemoizedFn((sortMap, dragObj) => {
    // 修改排序
    sortDept({
      tenantId: getTenantId(),
      sort: sortMap,
      dragData: {
        id: dragObj.id,
        pid: dragObj.parentId,
      },
    });
  });

  const onSelect = useMemoizedFn((keys, info) => {
    if (keys?.[0]) {
      setDeptSelectData({
        id: keys?.[0],
        name: info?.selectedNodes?.[0]?.name,
      });
    }
  });

  const { settingMenu } = useDeptMenuSetting();

  useEffect(() => {
    queryDeptAll();
  }, []);
  return (
    <>
      <CreateAndUpdateDept />
      <MenuList
        className="draggable-tree"
        isDirectory={false}
        selectedKeys={[deptSelectData?.id]}
        onSelect={onSelect}
        switcherIcon={
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DownOutlined />
          </div>
        }
        settingMenu={settingMenu}
        data={deptTree as any}
        onDragEnd={onDragEnd}
      />
    </>
  );
};
