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
  const workflowAppRef = useRef<WorkflowAppProcessor>();

  const [setWorkflowAppInstance, workflowResponse] = useWorkflowDesignSelector((s) => [
    s.setWorkflowAppInstance,
    s.workflowProcessor.getWorkflowResponse,
  ]);

  const onWorkflowAppReady = useMemoizedFn((instance: WorkflowAppProcessor) => {
    setWorkflowAppInstance(instance);
  });

  // const onAdd1 = (edge: any) => {
  //   const sourceId = uuid();
  //   ref.current?.addNodeByEdge({
  //     nodeType: ENodeType.GetMoreData,
  //     data: {
  //       data: {},
  //     },
  //     edge,
  //   });
  // };
  //

  const onAdd = () => {
    const sourceId = uuid();
    const endId = uuid();
    workflowAppRef.current?.graphProcessor?.addNode(ENodeType.TableEvent, {
      view: 'react-shape-view',
      shape: 'SHAPE_NODE',
      id: sourceId,
      label: 'hello',
      x: 0,
      y: 0,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      data: {
        id: 'node1',
        table: '1',
      },
    });

    workflowAppRef.current?.graphProcessor?.addNode(ENodeType.End, {
      view: 'react-shape-view',
      shape: 'SHAPE_NODE',
      id: endId,
      label: 'hello',
      x: 0,
      y: NODE_GAP + NODE_HEIGHT,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      data: {},
    });

    const edge = workflowAppRef.current?.graphProcessor?.addEdge(sourceId, endId);
    // onAdd1(edge);
    reset();
  };

  // @ts-ignore
  window._add = onAdd;

  useEffect(() => {
    setTimeout(() => {
      // onAdd();
    }, 1000);
  }, []);

  //
  const reset = () => {
    workflowAppRef.current?.graphProcessor?.redraw();
  };
  return (
    <div className={s.bg}>
      <WorkflowDesignHeader />
      <div className={s.content} style={{ height: 500 }}>
        {/* @ts-ignore */}
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
