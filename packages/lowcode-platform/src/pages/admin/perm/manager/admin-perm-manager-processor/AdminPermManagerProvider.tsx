import React, { createContext, FC, useEffect } from 'react';
import {
  AdminPermManagerProcessor,
  createAdminPermManagerProcessor,
} from './AdminPermManagerProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type AdminPermManagerProcessorWipe = WipeObservable<
  typeof AdminPermManagerProcessor.prototype
>;
export interface IAdminPermManagerProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as AdminPermManagerProcessor);

export const AdminPermManagerProvider: FC<IAdminPermManagerProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createAdminPermManagerProcessor();
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
export function useAdminPermManagerSelector<R extends any>(
  selector: (s: AdminPermManagerProcessorWipe) => R
) {
  return generateSelector<R, AdminPermManagerProcessorWipe>(Context, selector);
}
