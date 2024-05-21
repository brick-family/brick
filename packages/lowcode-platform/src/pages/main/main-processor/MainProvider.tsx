import React, { FC, createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { mainProcessor, MainProcessor } from './MainProcessor';
import { WipeObservable, generateSelector } from '@brick/core';

// 去除Observable类型
export type MainProcessorWipe = WipeObservable<typeof MainProcessor.prototype>;
export interface IMainProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as MainProcessor);

export const MainProvider: FC<IMainProviderProps> = ({ children }) => {
  const [globalServiceState, setGlobalServiceState] = useState<MainProcessor>(mainProcessor);

  return <Context.Provider value={globalServiceState!}>{children}</Context.Provider>;
};

/**
 * selector选择器
 * @param selector
 * @returns
 */
export function useMainSelector<R extends any>(selector: (s: MainProcessorWipe) => R) {
  return generateSelector<R, MainProcessorWipe>(Context, selector);
}
