import React, { forwardRef, memo } from 'react';
import { IWorkflowProps, Workflow } from './components';
import { WorkflowAppProcessor, WorkflowAppProvider, WorkflowProviderProps } from './processor';

export interface IWorkflowAppProps
  extends IWorkflowProps,
    Omit<WorkflowProviderProps, 'children'> {}

export const WorkflowApp = memo(
  forwardRef<WorkflowAppProcessor, IWorkflowAppProps>(
    ({ onReady, readonly, ...otherProps }, ref) => {
      return (
        <WorkflowAppProvider ref={ref} onReady={onReady} readonly={readonly}>
          <Workflow {...otherProps} />
        </WorkflowAppProvider>
      );
    }
  )
);
