import React, { createContext, FC, useEffect } from 'react';
import { createDataSelectProcessor, DataSelectProcessor } from './DataSelectProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type DataSelectProcessorWipe = WipeObservable<typeof DataSelectProcessor.prototype>;
export interface IDataSelectProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as DataSelectProcessor);

export const DataSelectProvider: FC<IDataSelectProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createDataSelectProcessor();
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
export function useDataSelectSelector<R extends any>(selector: (s: DataSelectProcessorWipe) => R) {
  return generateSelector<R, DataSelectProcessorWipe>(Context, selector);
}
