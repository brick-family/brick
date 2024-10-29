import React, { forwardRef, memo } from 'react';
import { IWorkflowProps, Workflow } from './components';
import { WorkflowAppProcessor, WorkflowAppProvider, WorkflowProviderProps } from './processor';

export interface IWorkflowAppProps extends IWorkflowProps, Pick<WorkflowProviderProps, 'onReady'> {}

export const WorkflowApp = memo(
  forwardRef<WorkflowAppProcessor, IWorkflowAppProps>(({ onReady, ...otherProps }, ref) => {
    return (
      <WorkflowAppProvider ref={ref} onReady={onReady}>
        <Workflow {...otherProps} />
      </WorkflowAppProvider>
    );
  })
);
