import { Portal } from '@antv/x6-react-shape';
import React, { forwardRef, memo } from 'react';
import { IWorkflowProps, Workflow } from './components';
import { WorkflowAppProcessor, WorkflowAppProvider } from './processor';

const X6ReactPortalProvider = Portal.getProvider();

export interface IWorkflowAppProps extends IWorkflowProps {}

export const WorkflowApp = memo(
  forwardRef<WorkflowAppProcessor, IWorkflowAppProps>(({ ...otherProps }, ref) => {
    return (
      <WorkflowAppProvider ref={ref}>
        <X6ReactPortalProvider />
        <Workflow {...otherProps} />
      </WorkflowAppProvider>
    );
  })
);
