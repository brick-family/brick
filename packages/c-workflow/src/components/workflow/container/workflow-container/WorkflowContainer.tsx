import React, { FC, useRef } from 'react';
import { useWorkflowAppSelector } from '../../../../processor';
import { NodeContainer } from '../node-container';
import { NodeBranchContainer } from '../node-container/node-branch-container/NodeBranchContainer';
import s from './WorkflowContainer.module.less';

export interface IWorkflowContainerProps {}

export const WorkflowContainer: FC<IWorkflowContainerProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [workflowData] = useWorkflowAppSelector((s) => [s.workflowData]);

  return (
    <div ref={containerRef} className={s.container} id="container">
      {workflowData?.layouts?.map((item) => {
        if (item?.children?.length) {
          return <NodeBranchContainer key={item.id} layoutItem={item} />;
        }
        return <NodeContainer key={item.id} layoutItem={item} />;
      })}
      <div className={s.nodeEnd}>流程结束</div>
    </div>
  );
};
