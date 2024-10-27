import React, { FC, useEffect, useRef } from 'react';
import s from './workflowDesign.less';
import {
  ENodeType,
  NODE_GAP,
  NODE_HEIGHT,
  NODE_WIDTH,
  WorkflowApp,
  WorkflowAppProcessor,
} from '@brick/workflow';
import { WorkflowDesignHeader } from '@/pages/workflow-design/components';
import {
  useWorkflowDesignSelector,
  WorkflowDesignProvider,
} from '@/pages/workflow-design/workflow-design-processor';
import { uuid } from '@brick/utils';
import { useMemoizedFn } from 'ahooks';

export interface IWorkflowDesignContentProps {}

export const WorkflowDesignContent: FC<IWorkflowDesignContentProps> = (props) => {
  const workflowAppRef = useRef<WorkflowAppProcessor>(null);

  const [setWorkflowAppInstance, workflowResponse] = useWorkflowDesignSelector((s) => [
    s.setWorkflowAppInstance,
    s.workflowProcessor.getWorkflowResponse,
  ]);

  const onWorkflowAppReady = useMemoizedFn((instance: WorkflowAppProcessor) => {
    setWorkflowAppInstance(instance);
  });

  return (
    <div className={s.bg}>
      <WorkflowDesignHeader />
      <div className={s.content}>
        <WorkflowApp
          ref={workflowAppRef}
          onReady={onWorkflowAppReady}
          data={workflowResponse.data}
        />
      </div>
    </div>
  );
};

export interface IWorkflowDesignProps {}

export const WorkflowDesign: FC<IWorkflowDesignProps> = (props) => {
  return (
    <WorkflowDesignProvider>
      <WorkflowDesignContent />
    </WorkflowDesignProvider>
  );
};

export default WorkflowDesign;
