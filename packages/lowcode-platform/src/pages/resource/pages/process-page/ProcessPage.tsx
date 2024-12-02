import { WorkflowApp, WorkflowAppProcessor } from '@brick/workflow';
import { useParams } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import React, { FC, useEffect } from 'react';
import { useResourcePageSelector } from '../../resource-page-processor';
import { ProcessOperation } from './process-operation/ProcessOperation';
import { ProcessPageProvider, useProcessPageSelector } from './process-page-processor';

export interface IContentProps {}

const Content: FC<IContentProps> = (props) => {
  const { resourceId } = useParams();
  const [currWorkflowData, setResourceId, setWorkflowAppInstance] = useProcessPageSelector((s) => [
    s.currWorkflowData,
    s.setResourceId,
    s.setWorkflowAppInstance,
  ]);

  useEffect(() => {
    if (resourceId) {
      setResourceId(resourceId!);
    }
  }, [resourceId]);
  console.log('q=>workflowList', currWorkflowData);

  const onWorkflowAppReady = useMemoizedFn((instance: WorkflowAppProcessor) => {
    console.log('q=>ready', instance);
    setWorkflowAppInstance(instance);
  });

  return (
    <>{currWorkflowData && <WorkflowApp onReady={onWorkflowAppReady} data={currWorkflowData} />}</>
  );
};

export interface IProgressPageProps {}

export const ProgressPage: FC<IProgressPageProps> = (props) => {
  const [OperationRightPortal] = useResourcePageSelector((s) => [
    s.portalProcessor?.OperationRightPortal,
  ]);

  console.log('q=>OperationRightPortal', OperationRightPortal);

  return (
    <ProcessPageProvider>
      <>
        <OperationRightPortal>
          <ProcessOperation />
        </OperationRightPortal>
        <Content />
      </>
    </ProcessPageProvider>
  );
};

export default ProgressPage;
