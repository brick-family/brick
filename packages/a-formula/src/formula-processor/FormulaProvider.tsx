import React, { createContext, FC, useEffect } from 'react';
import { createFormulaProcessor, FormulaProcessor } from './FormulaProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type FormulaProcessorWipe = WipeObservable<typeof FormulaProcessor.prototype>;

export interface IFormulaProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as FormulaProcessor);

export const FormulaProvider: FC<IFormulaProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createFormulaProcessor();
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
export function useFormulaSelector<R extends any>(selector: (s: FormulaProcessorWipe) => R) {
  return generateSelector<R, FormulaProcessorWipe>(Context, selector);
}
