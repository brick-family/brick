import React, { FC, createContext, useEffect, useRef, useState } from 'react';
import { ResourcePageProcessor, createResourcePageProcessor } from './ResourcePageProcessor';
import { WipeObservable, generateSelector } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type ResourcePageProcessorWipe = WipeObservable<typeof ResourcePageProcessor.prototype>;
export interface IResourcePageProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as ResourcePageProcessor);

export const ResourcePageProvider: FC<IResourcePageProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createResourcePageProcessor();
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
export function useResourcePageSelector<R extends any>(
  selector: (s: ResourcePageProcessorWipe) => R
) {
  return generateSelector<R, ResourcePageProcessorWipe>(Context, selector);
}
