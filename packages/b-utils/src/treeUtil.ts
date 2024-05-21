// let treeList: Array<DataNode> = []
import { DataNode } from 'antd/es/tree';

/**
 *  搜索树形结构
 * @param keyWords
 * @param treeList
 */
export const searchTreeData = (keyWords: string, treeList: Array<DataNode>) => {
  if (!keyWords) {
    return treeList;
  }
  if (keyWords) {
    const filterOptionFunc = (searchValue: string, dataNode: DataNode) => {
      const upperStr = searchValue?.toUpperCase();
      return String(dataNode?.title).toUpperCase().includes(upperStr);
    };
    // @ts-ignore
    function dig(list: DataNode[], keepAll: boolean = false): DataNode[] {
      return list
        .map((dataNode: DataNode) => {
          const children = dataNode.children;

          const match = keepAll || filterOptionFunc(keyWords!, dataNode);
          const childList = dig(children || [], match);

          if (match || childList.length) {
            return {
              ...dataNode,
              children: childList,
            };
          }
          return null;
        })
        .filter((node) => node) as DataNode[];
    }

    return dig(treeList);
  }
};
