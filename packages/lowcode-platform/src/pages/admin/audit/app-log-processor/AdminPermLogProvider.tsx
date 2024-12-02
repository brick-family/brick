import React, { createContext, FC, useEffect, useState } from 'react';
import { AdminPermLogProcessor, createAdminPermLogProcessor } from './AdminPermLogProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';

// 去除Observable类型
export type AdminPermLogProcessorWipe = WipeObservable<typeof AdminPermLogProcessor.prototype>;
export interface IAdminPermLogProviderProps {
  children: React.ReactElement;
}

const Context = createContext({} as AdminPermLogProcessor);
console.log('Context', Context);
export const AdminPermLogProvider: FC<IAdminPermLogProviderProps> = ({ children }) => {
  const processorAction = useCreation(() => {
    return createAdminPermLogProcessor();
  }, []);
  const { processor, getRoot, destroy } = processorAction || {};

  useEffect(() => {
    return () => {
      destroy?.();
    };
  }, []);
  console.log('processor12', processor);
  console.log('children', children, processor);
  return <Context.Provider value={processor}>{children}</Context.Provider>;
};
console.log('AdminPermLogProvider', Context);

// export const AdminPermLogProvider: FC<IAdminPermLogProviderProps> = ({ children }) => {
//   const [AppLogSerViceState, setAppLogSerViceState] = useState<AdminPermLogProcessor>(adminPermLogProcessor);
//   console.log('AppLogSerViceState', AppLogSerViceState, adminPermLogProcessor);
//   return <Context.Provider value={AppLogSerViceState!}>{children}</Context.Provider>;
// };

/**
 * selector选择器
 * @param selector
 * @returns
 */
export function useAdminPermLogSelector<R extends any>(
  selector: (s: AdminPermLogProcessorWipe) => R
) {
  console.log(
    'selector',
    selector,
    generateSelector<R, AdminPermLogProcessorWipe>(Context, selector)
  );
  return generateSelector<R, AdminPermLogProcessorWipe>(Context, selector);
}
