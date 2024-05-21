import { Portal } from '@antv/x6-react-shape';
import React, { forwardRef, memo } from 'react';
import { IWorkflowProps, Workflow } from './components';
import { WorkflowProcessor, WorkflowProvider } from './processor';

const X6ReactPortalProvider = Portal.getProvider();

export interface IWorkflowAppProps extends IWorkflowProps {}

export const WorkflowApp = memo(
  forwardRef<WorkflowProcessor, IWorkflowAppProps>(({ ...otherProps }, ref) => {
    return (
      <WorkflowProvider ref={ref}>
        <X6ReactPortalProvider />
        <Workflow {...otherProps} />
      </WorkflowProvider>
    );
  })
);
