import { ELocationStorageKey, IBaseEntity, IDeptEntity, TMenuData, TSortMap } from '@brick/types';
import { TransferItem } from 'antd/es/transfer';
import { DataNode } from 'antd/es/tree';
import { v4 as uuidV4 } from 'uuid';

// @ts-ignore
import { getRoot, globalProcessor } from '@brick/processor';
import lpLocalStorage from './localStorage';

/**
 *生成一个uuid
 * @returns uuid
 */
export const uuid = () => {
  return uuidV4();
};

/**
 * 快速排序
 * @param {*} arr
 */
export const quickSort: any = (arr: any, cbk: any) => {
  // 如果数组<=1,则直接返回
  if (arr.length <= 1) {
    return arr;
  }
  const pivotIndex = Math.floor(arr.length / 2);
  // 找基准，并把基准从原数组删除
  const pivot = arr.splice(pivotIndex, 1)[0];
  // 定义左右数组
  const left = [];
  const right = [];

  // 比基准小的放在left，比基准大的放在right
  for (let i = 0; i < arr.length; i++) {
    const condition = cbk(arr[i], pivot);
    if (condition) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 递归
  return quickSort(left, cbk).concat([pivot], quickSort(right, cbk));
};

/**
 * 扁平的数据结构转成Tree
 * @param items
 * @param key
 * @param parentKey
 * @returns
 */
export function arrayToTree<T extends Record<string, any>>(
  items: T[],
  key: string = 'id',
  parentKey: string = 'pid'
) {
  const result: T[] = []; // 存放结果集
  const itemMap: Record<string, any> = {}; //
  if (!Array.isArray(items)) {
    console.error('arrayToTree function argument must be an array!');
    return items;
  }
  for (const item of items) {
    const id = item[String(key)];
    const pid = item[parentKey];
    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      };
    }

    itemMap[id] = {
      ...item,
      children: itemMap?.[id]?.['children'] || [],
    };

    const treeItem = itemMap[id];

    if (pid === 0 || pid === null || pid === '' || pid === '0') {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}

/**
 * 对tree做排序
 * @param items
 * @param sortMap
 */
export function treeSort<T extends Record<string, any>>(items: T[], sortMap: TSortMap) {
  const newItems = quickSort(items, (a: any, b: any) => sortMap[a['id']] < sortMap[b['id']]);
  for (let item of items) {
    if (item?.children?.length > 0) {
      // @ts-ignore
      item.children = treeSort(item?.children, sortMap);
    }
  }
  return newItems;
}
/**
 * Tree数据转成排序的结果
 * @param items
 * @param key
 */
export function convertTreeSort<T extends Record<string, any>>(items: T[], key: string = 'id') {
  const result: Record<string, number> = {};
  let num = 1;
  function convert(d: T[]) {
    d?.forEach((item) => {
      result[item[key]] = num;
      num++;
      if (item?.children?.length > 0) {
        convert(item.children);
      }
    });
  }
  convert(items);

  return result;
}

/**
 * 获取appid
 * @returns
 */
export function getAppId() {
  return globalProcessor.appId.peek(); // lpLocalStorage.get(ELocationStorageKey.appId) || '';
}

export function getTenantId() {
  return (
    globalProcessor.currTenant?.id?.peek() || lpLocalStorage.get(ELocationStorageKey.tenantId) || ''
  );
}

/**
 * 数组转成Map
 * @param data 数组数据源
 * @param mapKey
 * @returns
 */
export const arrayToMap = <T extends Record<string, any>>(
  data: T[],
  mapKey: string,
  valueKey?: string
) => {
  const resultMap: Record<string, T> = {};
  data?.forEach((item) => {
    const key = item?.[mapKey];
    if (key) {
      resultMap[key] = valueKey ? item?.[valueKey] : item;
    }
  });
  return resultMap;
};

/**
 * 判断参数是否是function
 * @param fun
 * @returns
 */
export const isFunction = (fun: unknown) => {
  return typeof fun === 'function';
};

/**
 * 判断是否是Array
 * @param arr
 * @returns
 */
export const isArray = (arr: unknown) => {
  return Array.isArray(arr);
};

/**
 * 怕断是否是Object
 * @param obj
 * @returns
 */
export const isObject = (obj: unknown) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

/**
 * 根据query key获取对应的值
 * @param queryKey
 * @returns
 */
export function getQueryParams(queryKey: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(queryKey);
}

export const getAllKeys = (
  dataSource: DataNode[] | TransferItem[],
  selectedKeys: string[]
): string[] => {
  const resKeys: string[] = [...selectedKeys];
  const pushKeys = (dataArr: DataNode[]) => {
    dataArr.forEach((data) => {
      if (!resKeys.includes(String(data.key))) {
        resKeys.push(String(data.key));
        //extraKeys.push(String(data.key));
        if (data.children!?.length > 0) {
          pushKeys(data.children!);
        }
      }
    });
  };
  const findKeys = (data: DataNode[] | TransferItem[], selectKeys: String[]) => {
    data.forEach((item: DataNode | TransferItem) => {
      if (selectKeys!?.includes(item.key as String)) {
        if (item!?.children?.length > 0) {
          pushKeys(item.children);
        }
      }
      if (item.children!?.length > 0) {
        findKeys(item.children!, selectKeys);
      }
    });
  };
  findKeys(dataSource, selectedKeys);
  return resKeys;
};

export function findParentKey(
  treeData: DataNode[] | TransferItem[],
  nodeId: string,
  arr: string[]
) {
  for (let node of treeData) {
    // console.log(
    //   'node11',
    //   node,
    //   treeData,
    //   'nodeId',
    //   nodeId,
    //   node.children,
    //   'node.some',
    //   node.children?.some((item: any) => {
    //     console.log('nodeid&key', nodeId, item.key, item.key == nodeId);
    //     return item.key == nodeId;
    //   })
    // );

    if (
      node!?.children!?.length > 0 &&
      node.children.some((item: any) => {
        console.log('nodeid&key', nodeId, item.key, item.key == nodeId);
        return item.key == nodeId;
      })
    ) {
      console.log('1112222', node.key);
      arr.push(node.key as string);
    }

    if (node!?.children!?.length > 0) {
      findParentKey(node.children, nodeId, arr);
    }
  }
}

// const removeTargetKeys = (treeData: DataNode[] | TransferItem[], keys: string[], key: string) => {

// }

export const getTargetKeys = (
  treeData: DataNode[] | TransferItem[],
  keys: string[],
  moveKey: string
) => {
  console.log('MoveKey1111', moveKey, keys);
  const pKeyArr: string[] = [];
  findParentKey(treeData, moveKey, pKeyArr);
  let pKey = pKeyArr[pKeyArr.length - 1];
  console.log('pKey', pKeyArr);

  if (keys.includes(pKey)) {
    keys.splice(keys.indexOf(pKey), 1);
    console.log('keysinget', keys);
    getTargetKeys(treeData, keys, pKey as string);
  }
};

export const getCurrentTime = () => {
  let currentTime1 = new Date();

  let year = currentTime1.getFullYear();
  let month = (currentTime1.getMonth() + 1).toString().padStart(2, '0');
  let date = currentTime1.getDate().toString().padStart(2, '0');
  let hours = currentTime1.getHours().toString().padStart(2, '0');
  let minutes = currentTime1.getMinutes().toString().padStart(2, '0');
  let seconds = currentTime1.getSeconds().toString().padStart(2, '0');

  let formattedTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  console.log(formattedTime);
  return formattedTime;
};

/**
 * 删除base entity的属性
 * @param entity
 */
export const delBaseEntityAttr = (entity: IBaseEntity) => {
  if (entity) {
    delete entity.createTime;
    delete entity.createUser;
    delete entity.updateTime;
    delete entity.updateUser;
  }
};

export const treeToKeyEntities = (treeData: Array<TMenuData<IDeptEntity>>) => {
  const keyEntities = [] as Array<TMenuData<IDeptEntity>>;
  let level = 0;
  let maxLevel = 0;
  const processDataFun = (
    treeData: Array<TMenuData<IDeptEntity>>,
    keyEntities: Array<TMenuData<IDeptEntity>>,
    level: number
  ) => {
    treeData.forEach((data) => {
      const keyData = { ...data, level };
      maxLevel = Math.max(maxLevel, level);
      keyEntities.push(keyData);
      if (keyData.children?.length > 0) {
        processDataFun(keyData.children, keyEntities, level + 1);
      }
    });
  };
  processDataFun(treeData, keyEntities, level);
  return { keyEntities, maxLevel };
};

export const keyToLeLevelEntities = (KeyEntities: Array<TMenuData<IDeptEntity>>) => {
  const levelEntities = {} as any;
  KeyEntities.forEach((entity) => {
    if (!levelEntities[String(entity.level)]) {
      levelEntities[String(entity.level)] = [] as Array<TMenuData<IDeptEntity>>;
    }
    levelEntities[String(entity.level)].push(entity);
  });
  return levelEntities;
};

export const fillConductor = (
  key: string,
  checkedKeys: string[],
  levelEntities: any,
  maxLevel: number,
  keyEntities: Array<TMenuData<IDeptEntity>>
): Record<string, string[]> => {
  let allCheckedKeys = [] as string[];
  allCheckedKeys = allCheckedKeys.concat(checkedKeys);
  allCheckedKeys.push(key);
  for (let level = 0; level <= maxLevel; level++) {
    const entityArr = levelEntities[level] as Array<TMenuData<IDeptEntity>>;
    console.log('allCheckedKeys222', allCheckedKeys, entityArr);
    entityArr.forEach((entity) => {
      if (allCheckedKeys.indexOf(entity.key) > -1) {
        if (entity.children?.length > 0) {
          entity.children.forEach((item: any) => {
            if (allCheckedKeys.indexOf(item.key) == -1) {
              allCheckedKeys.push(item.key);
            }
          });
        }
      }
    });
  }
  const fillParentKey = (keyEntities: Array<TMenuData<IDeptEntity>>, key: String) => {
    const parentKey = keyEntities.find((entity) => {
      return entity.key == key;
    })?.pid;
    console.log('parentKey', parentKey);

    if (parentKey) {
      const parent = keyEntities.find((entity) => {
        return entity.key == parentKey;
      });

      if (
        parent?.children.every((item) => {
          return allCheckedKeys.indexOf(String(item.key)) > -1;
        })
      ) {
        allCheckedKeys.push(parentKey!);
        fillParentKey(keyEntities, parentKey);
      }
    }
  };
  fillParentKey(keyEntities, key);
  return { allCheckedKeys };
};

export const cleanConductor = (
  key: string,
  checkedKeys: string[],
  levelEntities: any,
  maxLevel: number,
  keyEntities: Array<TMenuData<IDeptEntity>>
) => {
  let allCheckedKeys = [] as string[];
  const cleanKeys = [] as string[];
  allCheckedKeys = [...checkedKeys];
  allCheckedKeys.splice(checkedKeys.indexOf(key), 1);
  cleanKeys.push(key);
  for (let level = 0; level <= maxLevel; level++) {
    const entityArr = levelEntities[level] as Array<TMenuData<IDeptEntity>>;
    console.log('allCheckedKeys222', allCheckedKeys, entityArr);
    entityArr.forEach((entity) => {
      if (cleanKeys.indexOf(entity.key) > -1) {
        if (entity.children?.length > 0) {
          entity.children.forEach((item: any) => {
            if (allCheckedKeys.indexOf(item.key) > -1) {
              allCheckedKeys.splice(allCheckedKeys.indexOf(item.key), 1);
              cleanKeys.push(item.key);
            }
          });
        }
      }
    });
  }
  const cleanParentKey = (keyEntities: Array<TMenuData<IDeptEntity>>, key: String) => {
    const parentKey = keyEntities.find((entity) => {
      return entity.key == key;
    })?.pid;
    console.log('parentKey', parentKey);

    if (parentKey && allCheckedKeys.indexOf(parentKey) > -1) {
      allCheckedKeys.splice(allCheckedKeys.indexOf(parentKey), 1);
      cleanKeys.push(parentKey);
      cleanParentKey(keyEntities, parentKey);
    }
  };
  cleanParentKey(keyEntities, key);
  return { allCheckedKeys, cleanKeys };
};
