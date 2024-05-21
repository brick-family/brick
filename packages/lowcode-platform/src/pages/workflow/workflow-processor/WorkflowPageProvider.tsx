import React, { createContext, FC, useEffect } from 'react';
import { createWorkflowPageProcessor, WorkflowPageProcessor } from './WorkflowPageProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type WorkflowProcessorWipe = WipeObservable<typeof WorkflowPageProcessor.prototype>;
export interface IWorkflowProps {
  children: React.ReactElement;
}

const Context = createContext({} as WorkflowPageProcessor);

export const WorkflowPageProvider: FC<IWorkflowProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createWorkflowPageProcessor();
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
export function useWorkflowPageSelector<R extends any>(selector: (s: WorkflowProcessorWipe) => R) {
  return generateSelector<R, WorkflowProcessorWipe>(Context, selector);
}
