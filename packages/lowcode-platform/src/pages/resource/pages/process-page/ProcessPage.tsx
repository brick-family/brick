import { WorkflowApp } from '@brick/workflow';
import { useParams } from '@umijs/max';
import React, { FC, useEffect } from 'react';
import { ProcessPageProvider, useProcessPageSelector } from './process-page-processor';

export interface IContentProps {}

const Content: FC<IContentProps> = (props) => {
  const { resourceId } = useParams();
  const [currWorkflowData, setResourceId] = useProcessPageSelector((s) => [
    s.currWorkflowData,
    s.setResourceId,
  ]);

  useEffect(() => {
    if (resourceId) {
      setResourceId(resourceId!);
    }
  }, [resourceId]);
  console.log('q=>workflowList', currWorkflowData);

  return <>{currWorkflowData && <WorkflowApp data={currWorkflowData} />}</>;
};

export interface IProgressPageProps {}

export const ProgressPage: FC<IProgressPageProps> = (props) => {
  return (
    <ProcessPageProvider>
      <Content />
    </ProcessPageProvider>
  );
};

export default ProgressPage;
