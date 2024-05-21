import React, { createContext, FC } from 'react';
import { ItemDetailProcessor, itemDetailProcessor } from './ItemDetailProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { IItemDetailProps } from '../ItemDetail';

// 去除Observable类型
export type ItemDetailProcessorWipe = WipeObservable<typeof ItemDetailProcessor.prototype>;

export interface IItemDetailProviderProps extends IItemDetailProps {
  children: React.ReactNode;
}

const Context = createContext({} as ItemDetailProcessor);

export const ItemDetailProvider: FC<IItemDetailProviderProps> = ({
  children,
  itemDetailProcessor: propsItemDetailProcessor,
}) => {
  return (
    <Context.Provider value={propsItemDetailProcessor || itemDetailProcessor}>
      {children}
    </Context.Provider>
  );
};

/**
 * selector选择器
 * R 在这里代表返回值的类型，这里要对R类型进行判断，如果内容有
 * @param selector
 * @returns
 */
export function useItemDetailSelector<R extends any>(selector: (s: ItemDetailProcessorWipe) => R) {
  return generateSelector<R, ItemDetailProcessorWipe>(Context, selector);
}
