import React, { createContext, FC, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import {
  createLowcodeEditorProcessor,
  lowcodeEditorProcessor,
  LowcodeEditorProcessor,
} from './LowcodeEditorProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';
import { ILowcodeEditorProps } from '../LowcodeEditor';
import { ILowcodeEditorInstance } from '../types';

// 去除Observable类型
export type DesignProcessorWipe = WipeObservable<typeof LowcodeEditorProcessor.prototype>;
export interface IDesignProviderProps extends ILowcodeEditorProps {
  children: React.ReactElement;
  ref: React.ForwardedRef<ILowcodeEditorInstance>;
}

const Context = createContext({} as LowcodeEditorProcessor);

export const LowcodeEditorProvider: FC<IDesignProviderProps> = ({
  children,
  // appId,
  // resourceId,
  resourceData,
  ref,
}) => {
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
      } as ILowcodeEditorInstance;
    },
    []
  );

  return <Context.Provider value={processor!}>{children}</Context.Provider>;
};

/**
 * selector选择器
 * @param selector
 * @returns
 */
export function useLowcodeEditorSelector<R extends any>(selector: (s: DesignProcessorWipe) => R) {
  return generateSelector<R, DesignProcessorWipe>(Context, selector);
}
