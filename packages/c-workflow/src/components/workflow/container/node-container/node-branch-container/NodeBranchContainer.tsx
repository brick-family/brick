import classNames from 'classnames';
import React, { useMemo } from 'react';

import s from './nodeBranchContainer.module.less';
import { ENodeType, IWorkflowLayoutItem, IWorkflowNodeData } from '@brick/types';
import { PANEL_ALL_DATA } from '../../../../../constants';
import { Button, Space } from 'antd';
import { NodeAdd } from '../../../../common';
import { NodeContainer } from '../NodeContainer';

export interface INodeBranchContainerProps {
  style?: React.CSSProperties;
  className?: string;
  layoutItem: IWorkflowLayoutItem;
}

export const NodeBranchContainer = (props: INodeBranchContainerProps) => {
  const { layoutItem } = props;
  const addBranch = () => {
    // TODO: 添加分支
  };

  return (
    <div className={s.nodeBranch}>
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
              <NodeContainer showArrow={false} layoutItem={item} />
            </div>
          );
        })}
      </div>
      <div className={s.nodeAdd}>
        <NodeAdd id={layoutItem.id} />
      </div>
    </div>
  );
};
