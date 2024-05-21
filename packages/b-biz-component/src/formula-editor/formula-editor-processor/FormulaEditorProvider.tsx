import React, { createContext, FC, useEffect } from 'react';
import { createFormulaEditorProcessor, FormulaEditorProcessor } from './FormulaEditorProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type FormulaEditorProcessorWipe = WipeObservable<typeof FormulaEditorProcessor.prototype>;
export interface IFormulaEditorProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as FormulaEditorProcessor);

export const FormulaEditorProvider: FC<IFormulaEditorProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createFormulaEditorProcessor();
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
export function useFormulaEditorSelector<R extends any>(
  selector: (s: FormulaEditorProcessorWipe) => R
) {
  return generateSelector<R, FormulaEditorProcessorWipe>(Context, selector);
}
