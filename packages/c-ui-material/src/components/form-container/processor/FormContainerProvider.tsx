import React, { createContext, FC, useEffect } from 'react';
import { createFormContainerProcessor, FormContainerProcessor } from './FormContainerProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type FormContainerProcessorWipe = WipeObservable<typeof FormContainerProcessor.prototype>;
export interface IFormContainerProviderProps {
  children: React.ReactElement;
  // 是否是H5
  isMobile: boolean;
}

const Context = createContext({} as FormContainerProcessor);

export const FormContainerProvider: FC<IFormContainerProviderProps> = ({ children, isMobile }) => {
  const processorAction = useCreation(() => {
    return createFormContainerProcessor();
  }, []);
  const { processor, getRoot, destroy } = processorAction || {};

  useEffect(() => {
    processor.setMobile(isMobile);
  }, [isMobile]);

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
export function useFormContainerSelector<R extends any>(
  selector: (s: FormContainerProcessorWipe) => R
) {
  return generateSelector<R, FormContainerProcessorWipe>(Context, selector);
}
