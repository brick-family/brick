import React, { createContext, useEffect, useImperativeHandle } from 'react';
import { createTransferSelectProcessor, TransferSelectProcessor } from './TransferSelectProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { TTransferSelectType } from '../types';
import { useCreation } from 'ahooks';
import { IUserEntity } from '@brick/types';

// 去除Observable类型
export type TransferSelectProcessorWipe = WipeObservable<typeof TransferSelectProcessor.prototype>;

export interface ITransferSelectProviderProps {
  children: React.ReactElement;
  type?: TTransferSelectType;
  targetKeys?: string[];
  userTargetData?: IUserEntity[];
}

const Context = createContext({} as TransferSelectProcessor);

export interface ITransferSelectProviderRef {
  processor: TransferSelectProcessor;
  getRoot: () => TransferSelectProcessor | null;
}

export const TransferSelectProvider = React.forwardRef<
  ITransferSelectProviderRef,
  ITransferSelectProviderProps
>(({ children, type, targetKeys, userTargetData }, ref) => {
  const processorAction = useCreation(() => {
    return createTransferSelectProcessor();
  }, []);
  const { processor, getRoot, destroy } = processorAction || {};
  useEffect(() => {
    return () => {
      destroy?.();
    };
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        processor,
        getRoot,
      };
    },
    []
  );

  useEffect(() => {
    processor.setType(type);
    if (targetKeys) {
      processor.setTargetKeys(targetKeys);
    }
    if (userTargetData) {
      processor.setUserTargetData(userTargetData);
      processor.setUserStoreTargetData(userTargetData);
      processor.setTreeSelectKeys(userTargetData.map((item) => item.id));
    }
  }, [type]);

  return <Context.Provider value={processor!}>{children}</Context.Provider>;
});

/**
 * selector选择器
 * @param selector
 * @returns
 */
export function useTransferSelectSelector<R extends any>(
  selector: (s: TransferSelectProcessorWipe) => R
) {
  return generateSelector<R, TransferSelectProcessorWipe>(Context, selector);
}
