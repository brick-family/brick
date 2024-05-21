import React, { createContext, FC, useLayoutEffect, useRef } from 'react';
import { lowcodeEditorProcessor, LowcodeEditorProcessor } from './LowcodeEditorProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
// TODO 应该不需要app
// import app from '@/pages/app/app';
import { ILowcodeEditorProps } from '../LowcodeEditor';

// 去除Observable类型
export type DesignProcessorWipe = WipeObservable<typeof LowcodeEditorProcessor.prototype>;
export interface IDesignProviderProps extends ILowcodeEditorProps {
  children: React.ReactElement;
}

const Context = createContext({} as LowcodeEditorProcessor);

export const LowcodeEditorProvider: FC<IDesignProviderProps> = ({
  children,
  appId,
  resourceId,
}) => {
  const processorRef = useRef(lowcodeEditorProcessor);
  const processor = processorRef.current;

  useLayoutEffect(() => {
    processor.setId(appId, resourceId);
  }, [resourceId]);

  // useEffect(() => {
  //   return () => {
  //     destroy?.();
  //   };
  // }, []);

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
