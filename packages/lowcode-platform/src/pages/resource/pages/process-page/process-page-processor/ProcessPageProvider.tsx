import React, { FC, createContext, useEffect, useRef, useState } from 'react';
import { ProcessPageProcessor, createProcessPageProcessor } from './ProcessPageProcessor';
import { WipeObservable, generateSelector } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type ProcessPageProcessorWipe = WipeObservable<typeof ProcessPageProcessor.prototype>;
export interface IProcessPageProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as ProcessPageProcessor);

export const ProcessPageProvider: FC<IProcessPageProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createProcessPageProcessor();
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
export function useProcessPageSelector<R extends any>(
  selector: (s: ProcessPageProcessorWipe) => R
) {
  return generateSelector<R, ProcessPageProcessorWipe>(Context, selector);
}
