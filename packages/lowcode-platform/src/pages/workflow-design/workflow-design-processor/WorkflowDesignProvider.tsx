import React, { createContext, FC, useEffect } from 'react';
import { createWorkflowDesignProcessor, WorkflowDesignProcessor } from './WorkflowDesignProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type WorkflowDesignProcessorWipe = WipeObservable<typeof WorkflowDesignProcessor.prototype>;
export interface IWorkflowDesignProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as WorkflowDesignProcessor);

export const WorkflowDesignProvider: FC<IWorkflowDesignProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createWorkflowDesignProcessor();
  }, []);
  const { processor, getRoot, destroy } = processorAction || {};

  useEffect(() => {
    return () => {
      destroy?.();
    };
  }, []);

  return <Context.Provider value={processor!}>{children}</Context.Provider>;
};

/**
 * selector选择器
 * @param selector
 * @returns
 */
export function useWorkflowDesignSelector<R extends any>(
  selector: (s: WorkflowDesignProcessorWipe) => R
) {
  return generateSelector<R, WorkflowDesignProcessorWipe>(Context, selector);
}
