import React, { createContext, FC, useEffect } from 'react';
import { createPermProcessor, PermProcessor } from './PermProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type PermProcessorWipe = WipeObservable<typeof PermProcessor.prototype>;
export interface IPermProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as PermProcessor);

export const PermProvider: FC<IPermProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createPermProcessor();
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
export function usePermSelector<R extends any>(selector: (s: PermProcessorWipe) => R) {
  return generateSelector<R, PermProcessorWipe>(Context, selector);
}
