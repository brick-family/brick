import React, { createContext, FC, useEffect } from 'react';
import { createFieldValueSetProcessor, FieldValueSetProcessor } from './FieldValueSetProcessor';
import { generateSelector, WipeObservable } from '@brick/core';
import { useCreation } from 'ahooks';
import { ITableEntity } from '@brick/types';
import { IFieldValue } from '../types';

// 去除Observable类型
export type FieldValueSetProcessorWipe = WipeObservable<typeof FieldValueSetProcessor.prototype>;

export interface IFieldValueSetProviderProps {
  children: React.ReactElement;
  tableConfig: ITableEntity;
  value?: IFieldValue[];
  onChange?: (value: IFieldValue[]) => void;
}

const Context = createContext({} as FieldValueSetProcessor);

export const FieldValueSetProvider: FC<IFieldValueSetProviderProps> = ({
  children,
  tableConfig,
  onChange,
  value,
}) => {
  const processorAction = useCreation(() => {
    return createFieldValueSetProcessor();
  }, []);

  const currProcessor = processorAction?.processor;

  useEffect(() => {
    currProcessor?.setValue?.(value!);
  }, [currProcessor]);

  useEffect(() => {
    currProcessor?.setTableConfig(tableConfig);
    if (onChange) {
      currProcessor?.setOnChange(onChange);
    }
  }, [tableConfig, currProcessor, onChange]);

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
