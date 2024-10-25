import classNames from 'classnames';
import React, { useMemo } from 'react';

import s from './nodeBranchContainer.module.less';
import { IWorkflowLayoutItem, IWorkflowNodeData } from '@brick/types';
import { Button } from 'antd';
import { NodeAdd } from '../../../../common';
import { NodeContainer } from '../NodeContainer';

export interface INodeBranchContainerProps {
  style?: React.CSSProperties;
  className?: string;
  layoutItem: IWorkflowLayoutItem;
  index: number;

  showArrow?: boolean;
}

export const NodeBranchContainer = (props: INodeBranchContainerProps) => {
  const { layoutItem, index, showArrow } = props;
  const addBranch = () => {
    // TODO: 添加分支
  };

  return (
    <div className={s.nodeBranch} node-id={layoutItem.id}>
      <div className={s.container}>
        <div className={s.addButton}>
          <Button onClick={addBranch}>添加分支</Button>
        </div>
        {layoutItem?.children?.map((item, index) => {
          return (
            <div
              key={item.id}
              className={classNames(s.item, {
                [s.itemLeft]: index === 0,
                [s.itemRight]: index === layoutItem?.children?.length! - 1,
              })}
            >
              <div>
                <NodeContainer layoutItem={item} />
                {item?.children?.map((childItem, childIndex) => {
                  // return <NodeContainer layoutItem={childItem} />
                  if (childItem?.children?.length) {
                    return (
                      <NodeBranchContainer
                        index={index}
                        showArrow={false}
                        key={childItem.id}
                        layoutItem={childItem}
                      />
                    );
                  }
                  return <NodeContainer key={childItem.id} layoutItem={childItem} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={classNames(s.nodeAdd, {
          'node-add-end': true,
          [s.hideArrow]: !showArrow,
          [layoutItem?.children?.length + '-' + (index + 1)]: true,
        })}
      >
        <NodeAdd sourceNodeId={layoutItem.id} />
      </div>
    </div>
  );
};
