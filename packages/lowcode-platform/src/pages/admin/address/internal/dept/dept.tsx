import React, { FC, memo, useEffect } from 'react';
import { DeptTree } from './common';
import s from './dept.less';
import { MenuList } from '@/components';
import { useMemoizedFn } from 'ahooks';
import { useInternalSelector } from '@/pages/admin/address/internal/internal-processor';

const userItems = [
  {
    name: '全部成员',
    key: '1',
  },
  {
    name: '离职成员',
    key: '2',
  },
];
export interface IDeptProps {}

export const Dept: FC<IDeptProps> = memo((props) => {
  const [deptSelectData, setDeptSelectData] = useInternalSelector((s) => [
    s.selectData,
    s.setSelectData,
  ]);

  useEffect(() => {
    setDeptSelectData({
      id: userItems[0].key,
      name: userItems[0].name,
    });
  }, []);

  const onSelect = useMemoizedFn((keys, info) => {
    if (keys?.[0]) {
      setDeptSelectData({
        id: keys?.[0],
        name: info?.selectedNodes?.[0]?.name,
      });
    }
  });

  return (
    <div className={s.dept}>
      <div className={s.label}>成员</div>
      <MenuList
        data={userItems! as any}
        isDirectory={false}
        isDraggable={false}
        isOnlyOneLevel
        selectedKeys={[deptSelectData?.id]}
        onSelect={onSelect}
      />
      <div className={s.label}>部门</div>
      <div className={s.tree}>
        <DeptTree />
      </div>
    </div>
  );
});
