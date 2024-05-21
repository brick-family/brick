import React, { createContext, FC, useLayoutEffect, useState } from 'react';

import { generateSelector, WipeObservable } from '@brick/core';

import { GlobalProcessor, globalProcessor } from './';

// 去除Observable类型
export type GlobalProcessorWipe = WipeObservable<typeof GlobalProcessor.prototype>;
export interface IGlobalProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as GlobalProcessor);

export const GlobalProvider: FC<IGlobalProviderProps> = ({ children }) => {
  const [globalServiceState, setGlobalServiceState] = useState<GlobalProcessor>(globalProcessor);

  useLayoutEffect(() => {
    // const currTableService = new GlobalProcessor();
    // setGlobalServiceState(currTableService);
  }, []);

  return <Context.Provider value={globalServiceState!}>{children}</Context.Provider>;
};

/**
 * selector选择器
 * @param selector
 * @returns
 */
export function useGlobalSelector<R extends any>(selector: (s: GlobalProcessorWipe) => R) {
  return generateSelector<R, GlobalProcessorWipe>(Context, selector);
}
