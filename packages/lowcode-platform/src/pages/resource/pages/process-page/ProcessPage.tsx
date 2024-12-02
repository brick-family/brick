import { WorkflowApp, WorkflowAppProcessor } from '@brick/workflow';
import { useParams, useSearchParams } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import React, { FC, useEffect } from 'react';
import { useResourcePageSelector } from '../../resource-page-processor';
import { ProcessOperation } from './process-operation/ProcessOperation';
import { ProcessPageProvider, useProcessPageSelector } from './process-page-processor';

export interface IContentProps {}

const Content: FC<IContentProps> = (props) => {
  const { resourceId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const [currWorkflowData, setWorkflowId, setResourceId, setWorkflowAppInstance, selectVersion] =
    useProcessPageSelector((s) => [
      s.currWorkflowData,
      s.setWorkflowId,
      s.setResourceId,
      s.setWorkflowAppInstance,
      s.selectVersion,
    ]);

  const workflowId = searchParams.get('wid');

  useEffect(() => {
    if (workflowId) {
      setWorkflowId(workflowId!);
      return;
    }

    if (selectVersion?.metaInfo) {
      setSearchParams({ wid: selectVersion.metaInfo });
    }
  }, [workflowId, selectVersion]);

  useEffect(() => {
    if (resourceId) {
      setResourceId(resourceId!);
    }
  }, [resourceId]);

  // console.log('q=>workflowList', currWorkflowData);

  const onWorkflowAppReady = useMemoizedFn((instance: WorkflowAppProcessor) => {
    // console.log('q=>ready', instance);
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

  return (
    <ProcessPageProvider>
      <>
        <OperationRightPortal.Portal>
          <ProcessOperation />
        </OperationRightPortal.Portal>
        <Content />
      </>
    </ProcessPageProvider>
  );
};

export default ProgressPage;
