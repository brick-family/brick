import classNames from 'classnames';
import React, { useMemo } from 'react';
import s from './nodeBranchContainer.module.less';
import { IWorkflowLayoutItem, IWorkflowNodeData } from '@brick/types';
import { Button } from 'antd';
import { NodeAdd } from '../../../../common';
import { NodeContainer } from '../NodeContainer';
import { useWorkflowAppSelector } from '../../../../../processor';

export interface INodeBranchContainerProps {
  style?: React.CSSProperties;
  className?: string;
  layoutItem: IWorkflowLayoutItem;
  showArrow?: boolean;
}

export const NodeBranchContainer = (props: INodeBranchContainerProps) => {
  const { layoutItem, showArrow } = props;

  const [addBranchNodeData] = useWorkflowAppSelector((s) => [s.addBranchNodeData]);

  const addBranch = () => {
    addBranchNodeData({
      sourceNodeId: layoutItem.id,
    });
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
      <NodeAdd className="node-add-end" showArrow={showArrow} sourceNodeId={layoutItem.id} />
    </div>
  );
};
