import React, { useEffect, useMemo, useState } from 'react';
import {
  Active,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { BDragHandle, BSortItem } from './BSortItem';
import classNames from 'classnames';
import s from './sortableList.module.less';

const findTransformParent = (node: HTMLElement) => {
  const recursiveFind = (childNode: HTMLElement): HTMLElement | null => {
    const parentElement = childNode.parentElement;

    if (!parentElement) {
      // 已经遍历到头了
      return null;
    }

    const parentTransformStyle = parentElement.style.transform;

    if (!parentTransformStyle || parentTransformStyle === 'none') {
      // 不是拥有transform属性的父级元素
      return recursiveFind(parentElement);
    }

    return parentElement;
  };

  return recursiveFind(node);
};

export interface ISortableBaseItem {
  id: UniqueIdentifier;
  className?: string;
}

export interface IBSortableListProps<T extends ISortableBaseItem> {
  items: T[];

  onSort(items: T[]): void;

  renderItem: (item: T) => React.ReactNode;

  className?: string;
}

export const BSortableList = <T extends ISortableBaseItem>({
  items,
  onSort,
  renderItem,
  className = '',
}: // sortPropKey = 'id',
IBSortableListProps<T>) => {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  let RenderItem = renderItem;

  return (
    <DndContext
      sensors={sensors}
      // measuring={{
      //   draggable: {
      //     measure: (node) => {
      //       console.log('the measured node: ', node);
      //       console.log('children: ', node.children);
      //
      //       const nodeRect = node.getBoundingClientRect().toJSON();
      //
      //       const transformParent = findTransformParent(node);
      //       const transformParentRect = transformParent?.getBoundingClientRect();
      //
      //       if (transformParentRect) {
      //         console.log('calculated rect:', transformParent);
      //         nodeRect.left = nodeRect.left - transformParentRect.left;
      //         nodeRect.top = nodeRect.top - transformParentRect.top;
      //         // nodeRec
      //       }
      //
      //       return nodeRect;
      //     },
      //   },
      // }}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onSort(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <div className={classNames(s.list, className)}>
          {items.map((item, index) => (
            <React.Fragment key={item.id || index}>
              {renderItem(item)}
              {/*<RenderItem item={item} />*/}
            </React.Fragment>
          ))}
        </div>
      </SortableContext>
      {/*<BSortableOverlay>{activeItem ? renderItem?.(activeItem) : null}</BSortableOverlay>*/}
    </DndContext>
  );
};

BSortableList.Item = BSortItem;
BSortableList.DragHandle = BDragHandle;
