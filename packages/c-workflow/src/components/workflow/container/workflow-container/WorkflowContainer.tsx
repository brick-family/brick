import React, { FC, useRef } from 'react';
import { useWorkflowAppSelector } from '../../../../processor';
import s from './WorkflowContainer.module.less';

export interface IWorkflowContainerProps {}

export const WorkflowContainer: FC<IWorkflowContainerProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [workflowData] = useWorkflowAppSelector((s) => [s.workflowData]);
  console.log('q=>workflowData', workflowData);
  return (
    <div ref={containerRef} className={s.container} id="container">
      {/* {
        workflowData?.nodeMap
      } */}
      <div className={s.nodeEnd}>流程结束</div>
    </div>
  );
};
