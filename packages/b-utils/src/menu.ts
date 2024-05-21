// import { DataNode } from 'antd/es/tree';

import { EResourceType, IResourceEntity, IResourceListVo, TMenuData } from '@brick/types';
import history from './history';
import { arrayToTree, getAppId, treeSort } from './util';

/**
 * 左侧资源转换成菜单的形式
 * @param resource
 * @returns
 */
export const convertResourceToMenu = (resourceVo: IResourceListVo) => {
  const { list: resource, sortMap } = resourceVo;
  const convertData = resource?.map((item) => {
    return {
      id: item.id,
      icon: item.extraParam?.icon,
      parentId: item.parentId,
      ...item,
      title: item.title,
      isLeaf: item.resourceType !== 'GROUP',
      key: item.id,
    } as IResourceEntity;
  });

  let tree = arrayToTree(convertData || [], 'id', 'parentId');
  if (sortMap) {
    tree = treeSort(tree, sortMap);
  }
  return tree;
};

/**
 * 获取第一个菜单节点
 */
export const getFirstMenu = (menus: TMenuData[]) => {
  let firstMenu: TMenuData = undefined;
  (function find(d) {
    for (const curr of d) {
      if (curr.resourceType === EResourceType.TABLE) {
        firstMenu = curr;
        return;
      }
      if (curr.children?.length > 0) {
        find(curr.children as any);
      }
    }
  })(menus);
  return firstMenu;
};

/**
 * 设置第一个菜单选中
 * @param menus
 * @param resourceId
 */
export const selectFirstMenu = (menus: TMenuData, resourceId: string) => {
  let firstMenu = getFirstMenu(menus);

  console.log('q=>firstMenu', firstMenu);
  if (resourceId === 'home' && firstMenu && firstMenu?.id) {
    const appId = getAppId();
    history.replace(`/app/${appId}/${firstMenu?.id}`);
    // return;
  }
};
