import React, { createContext, FC, useEffect } from 'react';
import { createSliderProcessor, SliderProcessor } from './SliderProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type SliderProcessorWipe = WipeObservable<typeof SliderProcessor.prototype>;
export interface ISliderProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as SliderProcessor);

export const SliderProvider: FC<ISliderProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createSliderProcessor();
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
export function useSliderSelector<R extends any>(selector: (s: SliderProcessorWipe) => R) {
  return generateSelector<R, SliderProcessorWipe>(Context, selector);
}
