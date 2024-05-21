import { WipeObservable, generateSelector } from '@brick/core';
import React, { createContext, useImperativeHandle, useLayoutEffect, useState } from 'react';
import { destroy, setWorkflowProcessor } from './WorkflowManager';
import { WorkflowProcessor } from './WorkflowProcessor';

// 去除Observable类型
export type WorkflowProcessorWipe = WipeObservable<typeof WorkflowProcessor.prototype>;

export interface WorkflowProviderProps {
  children: React.ReactNode;
}

const Context = createContext({} as WorkflowProcessor);

export const WorkflowProvider = React.forwardRef<WorkflowProcessor, WorkflowProviderProps>(
  (props, ref) => {
    const [currWorkflowProcessor, setCurrWorkflowProcessor] = useState<WorkflowProcessor>();

    useImperativeHandle(
      ref,
      () => {
        return currWorkflowProcessor!;
      },
      [currWorkflowProcessor]
    );

    useLayoutEffect(() => {
      const wp = new WorkflowProcessor();
      setCurrWorkflowProcessor(wp);
      setWorkflowProcessor(wp);
      return () => {
        // 销毁workflow manager
        destroy?.();
      };
    }, []);

    if (!currWorkflowProcessor) {
      return <></>;
    }

    return <Context.Provider value={currWorkflowProcessor}>{props.children}</Context.Provider>;
  }
);

/**
 * selector选择器
 * R 在这里代表返回值的类型，这里要对R类型进行判断，如果内容有
 * @param selector
 * @returns
 */
export function useWorkflowSelector<R extends any>(selector: (s: WorkflowProcessorWipe) => R) {
  return generateSelector<R, WorkflowProcessorWipe>(Context, selector);
}
