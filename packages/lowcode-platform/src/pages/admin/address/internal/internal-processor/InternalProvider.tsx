import React, { createContext, FC, useEffect } from 'react';
import { createInternalProcessor, InternalProcessor } from './InternalProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type InternalProcessorWipe = WipeObservable<typeof InternalProcessor.prototype>;
export interface IInternalProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as InternalProcessor);

export const InternalProvider: FC<IInternalProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createInternalProcessor();
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
export function useInternalSelector<R extends any>(selector: (s: InternalProcessorWipe) => R) {
  return generateSelector<R, InternalProcessorWipe>(Context, selector);
}
