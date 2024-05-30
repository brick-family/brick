import { Portal } from '@antv/x6-react-shape';
import React, { forwardRef, memo } from 'react';
import { IWorkflowProps, Workflow } from './components';
import { WorkflowAppProcessor, WorkflowAppProvider, WorkflowProviderProps } from './processor';

const X6ReactPortalProvider = Portal.getProvider();

export interface IWorkflowAppProps extends IWorkflowProps, Pick<WorkflowProviderProps, 'onReady'> {}

export const WorkflowApp = memo(
  forwardRef<WorkflowAppProcessor, IWorkflowAppProps>(({ onReady, ...otherProps }, ref) => {
    return (
      <WorkflowAppProvider ref={ref} onReady={onReady}>
        <X6ReactPortalProvider />
        <Workflow {...otherProps} />
      </WorkflowAppProvider>
    );
  })
);
