import React, { FC, createContext, useEffect, useRef, useState } from 'react';
import { FieldValueSetProcessor, createFieldValueSetProcessor } from './FieldValueSetProcessor';
import { WipeObservable, generateSelector } from '@brick/core';
import { useCreation } from 'ahooks';
import { ITableEntity } from '@brick/types';
import { IFieldValue } from '../types';

// 去除Observable类型
export type FieldValueSetProcessorWipe = WipeObservable<typeof FieldValueSetProcessor.prototype>;
export interface IFieldValueSetProviderProps {
  children: React.ReactElement;
  tableConfig: ITableEntity;
  value?: IFieldValue[];
}

const Context = createContext({} as FieldValueSetProcessor);

export const FieldValueSetProvider: FC<IFieldValueSetProviderProps> = ({
  children,
  tableConfig,
}) => {
  const processorAction = useCreation(() => {
    return createFieldValueSetProcessor();
  }, []);

  useEffect(() => {
    if (!processorAction) {
      return;
    }

    processorAction.processor?.setTableConfig(tableConfig);
  }, [tableConfig, processorAction]);
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
export function useFieldValueSetSelector<R extends any>(
  selector: (s: FieldValueSetProcessorWipe) => R
) {
  return generateSelector<R, FieldValueSetProcessorWipe>(Context, selector);
}
