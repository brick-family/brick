import React, { useEffect, useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Tree } from 'antd';
import { DataNode, TreeProps } from 'antd/es/tree';

import { TMenuData, TSortMap } from '@brick/types';
import { convertTreeSort } from '@brick/utils';
import { IItemProps, Item } from './common';

import s from './menuList.less';
import classNames from 'classnames';

const { DirectoryTree } = Tree;

export interface IMenuListProps<T extends Record<string, any> = any>
  extends Omit<TreeProps, 'onDragEnd' | 'selectedKeys'>,
    Pick<IItemProps<T>, 'renderItemSetting' | 'settingMenu'> {
  /**
   * 是否是目录tree
   */
  isDirectory?: boolean;
  /**
   * 是否允许托拽
   */
  isDraggable?: boolean;

  // /**
  //  * 是否隐藏设置按钮
  //  */
  // hiddenSetting?: boolean;

  /**
   * 是否仅仅只有一级
   */
  isOnlyOneLevel?: boolean;
  /**
   * tree数据
   */
  data: Array<TMenuData<T>>;
  /**
   * 托拽结束回调
   * @param sortList
   * @param dragData
   * @returns
   */
  onDragEnd?: (sortList: TSortMap, dragData: Record<string, any>) => void;

  /**
   * 分组是否可以选中
   */
  groupIsSelected?: boolean;

  /**
   * 当前选中的key
   */
  selectedKeys?: Array<string>;
}

export const MenuList = <T extends Record<string, any> = any>({
  data: gpData,
  isDirectory = true,
  onDragEnd,
  isDraggable = true,
  // hiddenSetting = false,
  renderItemSetting,
  settingMenu,
  groupIsSelected = false,
  isOnlyOneLevel = false,
  ...otherProps
}: IMenuListProps<T>) => {
  const [gData, setGData] = useState(gpData);

  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);

  useEffect(() => {
    setGData(gpData);
  }, [gpData]);

  useEffect(() => {
    if (otherProps?.selectedKeys) {
      setSelectedKeys(otherProps?.selectedKeys!);
    }
  }, [otherProps?.selectedKeys]);
  const titleRender = useMemoizedFn((nodeData: DataNode) => {
    // @ts-ignore
    const name = nodeData.title || nodeData.name;
    return (
      <Item
        renderItemSetting={renderItemSetting}
        settingMenu={settingMenu}
        data={nodeData}
        name={name}
      />
    );
  });

  const onDragEnter = useMemoizedFn(({ event, node, expandedKeys }) => {
    // console.log('q=>drag-enter', event, node, expandedKeys);
  });

  const onDrop = useMemoizedFn((info) => {
    // dragNode 当前托拽的节点 dropPosition 托拽位置， node 放置节点
    const { dragNode, node } = info;

    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: any;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    // 获取sort map
    const sortMap = convertTreeSort(data);

    // 更新drag对象的pid
    const updateDragObjPid = (data: Array<any>, pid: string) => {
      data?.forEach((item: any) => {
        if (item.id === dragObj.id) {
          dragObj.parentId = pid;
          return;
        }
        if (item?.children?.length > 0) {
          updateDragObjPid(item?.children, item.id);
        }
      });
    };

    updateDragObjPid(data, '');

    onDragEnd?.(sortMap, dragObj);
    setGData(data);
  });

  const onSelect = useMemoizedFn((selectedKeys, info) => {
    const { node } = info;
    if (groupIsSelected || node.isLeaf || isOnlyOneLevel) {
      setSelectedKeys(selectedKeys);
    }
    otherProps?.onSelect?.(selectedKeys, info);
  });
  const TreeComponent = isDirectory ? DirectoryTree : Tree;

  return (
    <TreeComponent
      className={classNames(s.menuList, {
        [s.oneLevel]: isOnlyOneLevel,
      })}
      switcherIcon={false}
      fieldNames={{
        key: 'id',
      }}
      {...otherProps}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      // icon={() => <DashOutlined />}
      draggable={{
        icon: false,
        nodeDraggable: (node: DataNode) => {
          return isDraggable;
        },
      }}
      allowDrop={(info) => {
        // 设置是否允许放置
        const { dragNode, dropNode, dropPosition } = info;
        if (dropNode.isLeaf && dropPosition === 0) {
          return false;
        }
        return true;
      }}
      showIcon={true}
      titleRender={titleRender}
      blockNode
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={gData}
    />
  );
};
