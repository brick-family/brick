import * as nodes from '../components/nodes';
import { INodeModuleValue, TNodeModuleMap } from '../components/common';
import { uuid } from '@brick/core';
import { IWorkflowLayoutItem, IWorkflowNodeData, TNodeType, TWorkflowLayouts } from '@brick/types';
import { Observable } from '@legendapp/state';

/**
 * 获取node module
 */
export const getNodeModule = () => {
  const result: TNodeModuleMap = {} as TNodeModuleMap;

  Object.values(nodes).forEach((item) => {
    const metaData = item.getMetadata();
    const nodeType = metaData.type;

    const nodeModuleValue: INodeModuleValue = {
      nodeComponent: item.getNodeElement(),
      settingComponent: item.getSettingPanel(),
      metaData,
      defaultNodeConfigData: item.getDefaultConfigData?.() || {},
      validation: item.validation as any,
    };
    result[nodeType] = nodeModuleValue;
  });

  return result;
};

/**
 * 获取默认节点配置
 * @param nodeType
 * @param options
 */
export const getDefaultNodeData = (
  nodeType: TNodeType,
  options?: {
    defaultNodeData?: Partial<IWorkflowNodeData>;
    // 是否用node type当id
    useNodeTypeId?: boolean;
  }
) => {
  const { defaultNodeData, useNodeTypeId } = options || {};

  const nodeModule = getNodeModule();

  const { metaData, defaultNodeConfigData } = nodeModule?.[nodeType] || {};
  return {
    id: useNodeTypeId ? nodeType : uuid(),
    type: nodeType,
    name: metaData?.name,
    config: defaultNodeConfigData || {},
    ...defaultNodeData,
  } as IWorkflowNodeData;
};

/**
 * 递归查找节点所在的同级数组,在同级数组中插入新节点
 * @param params { id: string; layouts: Observable<TWorkflowLayouts>, newNode: any }
 * @returns
 */
export function recursiveAddNode(params: {
  sourceNodeId: string;
  layouts: Observable<TWorkflowLayouts>;
  newLayoutItem: IWorkflowLayoutItem;
  isChildrenInsert: boolean; // 是否子级插入
  childrenInsertDirect: 'before' | 'after'; // 子级插入方向
}): boolean {
  const {
    layouts,
    newLayoutItem,
    sourceNodeId,
    isChildrenInsert = false,
    childrenInsertDirect = 'before',
  } = params;

  layouts.forEach((item, i) => {
    if (item.id.get() === sourceNodeId) {
      // 添加children, 并在第一个位置插入
      if (isChildrenInsert) {
        const arr = item.children?.get() || [];
        if (childrenInsertDirect === 'before') {
          arr.unshift?.(newLayoutItem);
        } else {
          // 在最后一个位置前插入
          arr.splice(arr.length - 1, 0, newLayoutItem);
        }
      } else {
        layouts.splice(i + 1, 0, newLayoutItem);
      }
      return true;
    }

    if (
      item.children?.get().length &&
      recursiveAddNode({
        sourceNodeId,
        layouts: item.children as Observable<TWorkflowLayouts>,
        newLayoutItem,
        isChildrenInsert,
        childrenInsertDirect,
      })
    ) {
      return true;
    }
  });

  return false;
}

// export function recursiveRemoveNode(params: {
//   sourceNodeId: string;
//   layouts: Observable<TWorkflowLayouts>,
// }) {
//   const { layouts, sourceNodeId } = params;
//   let found = false;
//   layouts.forEach((item, index) => {
//     if (found) return;

//     if (item.id.get() === sourceNodeId) {
//       // 找到并删除匹配的节点
//       layouts.splice(index - 1, 1);
//       found = true;
//     } else if (item.children.get().length && recursiveRemoveNode({
//       sourceNodeId,
//       layouts: item.children as Observable<TWorkflowLayouts>
//     })) {
//       found = true;
//     }
//   });

//   return found;
// }

export function recursiveRemoveNode(params: {
  sourceNodeId: string;
  layouts: Observable<TWorkflowLayouts>;
  deleteIfSingle?: boolean;
  parentLayoutItem?: IWorkflowLayoutItem;
  parentLayouts?: IWorkflowLayoutItem[];
}): string[] {
  const { sourceNodeId, layouts, deleteIfSingle = false, parentLayoutItem, parentLayouts } = params;
  const deletedIds: string[] = [];

  layouts.forEach((item, index) => {
    if (item.id.get() === sourceNodeId) {
      // 收集所有要删除的节点 ID
      collectDeletedIds(item.get(), deletedIds);

      // 删除当前节点
      layouts.splice(index, 1);

      // 判断是否需要递归删除同级及父节点
      if (deleteIfSingle && layouts.length === 1) {
        console.log('q=>removeIds-2', item?.get()?.id, JSON.stringify(layouts.get()));
        deletedIds.push(...recursiveRemoveParentNode(layouts));

        // 添加父节点
        if (parentLayoutItem) {
          deletedIds.push(parentLayoutItem?.id);
          // 当前父节点删除
          parentLayouts?.splice(parentLayouts.indexOf(parentLayoutItem), 1);
          console.log('q=>removeIds-parent', parentLayoutItem);
        }
      }
    } else if (item.children?.get().length) {
      // 如果有子节点，递归删除
      deletedIds.push(
        ...recursiveRemoveNode({
          sourceNodeId,
          layouts: item.children as Observable<TWorkflowLayouts>,
          deleteIfSingle,
          parentLayoutItem: item.get(), // 传递父节点
          parentLayouts: layouts.get(), // 传递父节点数组
        })
      );
    }
  });

  return deletedIds;
}

// 收集被删除的节点 ID，包括子节点
function collectDeletedIds(node: IWorkflowLayoutItem, deletedIds: string[]) {
  deletedIds.push(node.id);
  node.children?.forEach((child) => collectDeletedIds(child, deletedIds));
}

// 递归删除父节点（当同级节点仅剩一个时）
function recursiveRemoveParentNode(layouts: Observable<TWorkflowLayouts>): string[] {
  const parentIds: string[] = [];
  const items = layouts.get();

  if (items.length === 1) {
    const remainingNode = items[0];
    // console.log('q=>removeIds-3', remainingNode);
    collectDeletedIds(remainingNode, parentIds);
    layouts.splice(0, 1);
  }

  return parentIds;
}

/**
 * // 递归查找节点并获取一级子节点数量
 * @param layouts
 * @param targetId
 * @returns
 */
export function getLayoutsChildrenCount(layouts: TWorkflowLayouts, targetId: string): number {
  // 递归遍历树，查找目标节点
  function findNode(node: IWorkflowLayoutItem): number | undefined {
    if (node.id === targetId) {
      return node.children ? node.children.length : 0; // 返回一级子节点数量
    }
    if (node.children) {
      for (const child of node.children) {
        const result = findNode(child);
        if (result !== undefined) return result;
      }
    }
    return undefined;
  }

  // 遍历树的每个根节点
  for (const root of layouts) {
    const result = findNode(root);
    if (result !== undefined) return result;
  }

  return 0; // 如果未找到目标节点，则返回0
}
