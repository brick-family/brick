import { generateSelector, WipeObservable } from '@brick/core';
import React, { createContext, useImperativeHandle, useLayoutEffect, useState } from 'react';
import { destroy, setWorkflowProcessor } from './WorkflowAppManager';
import { WorkflowAppProcessor } from './WorkflowAppProcessor';

// 去除Observable类型
export type WorkflowProcessorWipe = WipeObservable<typeof WorkflowAppProcessor.prototype>;

export interface WorkflowProviderProps {
  children: React.ReactNode;
}

const Context = createContext({} as WorkflowAppProcessor);

export const WorkflowAppProvider = React.forwardRef<WorkflowAppProcessor, WorkflowProviderProps>(
  (props, ref) => {
    const [currWorkflowProcessor, setCurrWorkflowProcessor] = useState<WorkflowAppProcessor>();

    useImperativeHandle(
      ref,
      () => {
        return currWorkflowProcessor!;
      },
      [currWorkflowProcessor]
    );

    useLayoutEffect(() => {
      const wp = new WorkflowAppProcessor();
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
