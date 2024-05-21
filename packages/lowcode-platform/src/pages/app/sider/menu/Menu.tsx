import React, { FC, useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';

import { MenuList } from '@/components';
import { updateResourceSort } from '@brick/services';
import { getAppId } from '@brick/utils';
import { useSliderSelector } from '../processor';

import s from './menu.less';
import { history } from '@umijs/max';
import { useParams } from 'umi';
import { useSliderMenuSetting } from '@/pages/app/sider/hooks';
import { SettingDialog } from '@/pages/app/sider/menu/setting';
import { useAppAdmin } from '@brick/biz-component';

export interface IMenuProps {}

// TODO menu 会多次渲染，需解决
export const Menu: FC<IMenuProps> = React.memo((props) => {
  const [resourcesTree] = useSliderSelector((s) => [s.resourceProcessor.resourcesTree]);

  console.log('q=>resourcesTree', resourcesTree);
  const { isAppAdmin } = useAppAdmin();
  const { resourceId } = useParams();
  // 当前选中的资源id
  const selectedKeys = useMemo(() => {
    return [resourceId] as Array<string>;
  }, [resourceId]);

  // console.log('q=>selectedKeys', selectedKeys, resourceId);
  const onDragEnd = useMemoizedFn((sortMap, dragObj) => {
    // 修改排序
    updateResourceSort({
      applicationId: getAppId(),
      sort: sortMap,
      dragData: {
        id: dragObj.id,
        parentId: dragObj.parentId,
      },
    });
  });

  const { settingMenu } = useSliderMenuSetting();

  const onSelect = useMemoizedFn((_, { node }) => {
    if (node.isLeaf) {
      // 叶子节点，代表是资源，不是分组
      const appId = getAppId();
      // console.log('q=>onSelect-1', node);
      history.replace(`/app/${appId}/${node.id}`);
      return;
    }
  });

  return (
    <div className={s.menu}>
      <MenuList
        isDraggable={isAppAdmin}
        selectedKeys={selectedKeys!}
        data={resourcesTree as any}
        onSelect={onSelect}
        onDragEnd={onDragEnd}
        settingMenu={isAppAdmin ? settingMenu : {}}
      />
      <SettingDialog />
    </div>
  );
});
