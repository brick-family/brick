import React, { FC, useRef } from 'react';
import { useWorkflowAppSelector } from '../../../../processor';
import { InfiniteViewerContainer } from '../../../common';
import { NodeContainer } from '../node-container';
import { NodeBranchContainer } from '../node-container/node-branch-container/NodeBranchContainer';
import s from './WorkflowContainer.module.less';

export interface IWorkflowContainerProps {}

export const WorkflowContainer: FC<IWorkflowContainerProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [workflowData] = useWorkflowAppSelector((s) => [s.workflowData]);

  return (
    <div ref={containerRef} className={s.container} id="container">
      {/* <InfiniteViewerContainer>
      </InfiniteViewerContainer> */}
      {workflowData?.graph?.map((item, index) => {
        if (item?.children?.length) {
          return (
            <NodeBranchContainer showArrow={true} index={index} key={item.id} layoutItem={item} />
          );
        }
        return <NodeContainer key={item.id} layoutItem={item} />;
      })}
      <div className={s.nodeEnd}>流程结束</div>
    </div>
  );
};
