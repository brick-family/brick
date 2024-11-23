import React, { createContext, FC, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { lowcodeEditorProcessor, LowcodeEditorProcessor } from './LowcodeEditorProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { ILowcodeEditorProps } from '../LowcodeEditor';
import { ILowcodeEditorInstance } from '../types';

// 去除Observable类型
export type DesignProcessorWipe = WipeObservable<typeof LowcodeEditorProcessor.prototype>;
export interface IDesignProviderProps extends ILowcodeEditorProps {
  children: React.ReactElement;
}

const Context = createContext({} as LowcodeEditorProcessor);

export const LowcodeEditorProvider = React.forwardRef<ILowcodeEditorInstance, IDesignProviderProps>(
  ({ children, resourceData }, ref) => {
    // TODO 目前只能用单实例
    // const processorAction = useCreation(() => {
    //   return createLowcodeEditorProcessor();
    // }, []);
    // const { processor, getRoot, destroy } = processorAction || {};

    const processorRef = useRef(lowcodeEditorProcessor);
    const processor = processorRef.current;

    useLayoutEffect(() => {
      processor.setResourceData(resourceData);
    }, [resourceData]);

    useImperativeHandle(
      ref,
      () => {
        return {
          saveSchema: processor.saveSchema,
          getTableData: () => {
            return processor.tableData;
          },
        } as ILowcodeEditorInstance;
      },
      [processor]
    );

    return <Context.Provider value={processor!}>{children}</Context.Provider>;
  }
);

/**
 * selector选择器
 * @param selector
 * @returns
 */
export function useLowcodeEditorSelector<R extends any>(selector: (s: DesignProcessorWipe) => R) {
  return generateSelector<R, DesignProcessorWipe>(Context, selector);
}
