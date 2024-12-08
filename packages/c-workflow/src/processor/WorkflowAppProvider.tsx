import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';
import React, {
  createContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { destroy, setWorkflowProcessor } from './WorkflowAppManager';
import { WorkflowAppProcessor } from './WorkflowAppProcessor';

// 去除Observable类型
export type WorkflowProcessorWipe = WipeObservable<typeof WorkflowAppProcessor.prototype>;

export interface WorkflowProviderProps {
  children: React.ReactNode;
  onReady?: (workflowInstance: WorkflowAppProcessor) => void;

  /**
   * 是否只读
   */
  readonly?: boolean;
}

const Context = createContext({} as WorkflowAppProcessor);

export const WorkflowAppProvider = React.forwardRef<WorkflowAppProcessor, WorkflowProviderProps>(
  (props, ref) => {
    const { onReady, readonly } = props;
    const [currWorkflowProcessor, setCurrWorkflowProcessor] = useState<WorkflowAppProcessor>();

    const wp = useCreation(() => new WorkflowAppProcessor(), []);

    useImperativeHandle(
      ref,
      () => {
        return currWorkflowProcessor!;
      },
      [currWorkflowProcessor]
    );

    // 更新readonly状态
    useEffect(() => {
      wp?.setReadonly(readonly!);
    }, [readonly]);

    useLayoutEffect(() => {
      setCurrWorkflowProcessor(wp);
      setWorkflowProcessor(wp);
      //@ts-ignore
      window._wp = wp;
      onReady?.(wp);
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
export function useWorkflowAppSelector<R extends any>(selector: (s: WorkflowProcessorWipe) => R) {
  return generateSelector<R, WorkflowProcessorWipe>(Context, selector);
}
