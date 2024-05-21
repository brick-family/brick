import React, { createContext, FC, useEffect } from 'react';
import { createQueryBuilderProcessor, QueryBuilderProcessor } from './QueryBuilderProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type QueryBuilderProcessorWipe = WipeObservable<typeof QueryBuilderProcessor.prototype>;
export interface IQueryBuilderProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as QueryBuilderProcessor);

export const QueryBuilderProvider: FC<IQueryBuilderProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createQueryBuilderProcessor();
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
export function useQueryBuilderSelector<R extends any>(
  selector: (s: QueryBuilderProcessorWipe) => R
) {
  return generateSelector<R, QueryBuilderProcessorWipe>(Context, selector);
}
