import React, { createContext, FC, useLayoutEffect, useState } from 'react';
import { DataTableProcessor, IDataTableFeature } from './DataTableProcessor';
import { BLoading } from '@brick/component';
import { generateSelector, WipeObservable } from '@brick/core';
import { createItemDetailProcessor, ItemDetailProcessor } from '@brick/biz-component';

// 去除Observable类型
export type DataTableProcessorWipe = WipeObservable<typeof DataTableProcessor.prototype>;

export interface IDataTableProviderProps {
  tableId: string;
  /**
   * Custom item detail processor, 如果传入了，就可以支持打开详情页
   */
  itemDetailProcessor?: ItemDetailProcessor;

  /**
   * 表格特性
   */
  feature?: IDataTableFeature;

  children: React.ReactElement;
}

const Context = createContext({} as DataTableProcessor);

export const DataTableProvider: FC<IDataTableProviderProps> = ({
  tableId,
  children,
  // 设置feature默认值
  feature = { hasCreate: true, hasDetail: true },
}) => {
  const [tableServiceState, setTableServiceState] = useState<DataTableProcessor>();

  useLayoutEffect(() => {
    const currTableService = new DataTableProcessor({ tableId, feature });
    if (feature.hasDetail) {
      const itemDetailProcessor = createItemDetailProcessor().processor;
      itemDetailProcessor?.setDataTableProcessor(currTableService);
      currTableService.setItemDetailProcessor(itemDetailProcessor);
    }

    // 设置 tableData Processor
    setTableServiceState(currTableService);
  }, [tableId]);

  if (!tableServiceState) {
    return <BLoading />;
  }
  return <Context.Provider value={tableServiceState}>{children}</Context.Provider>;
};

/**
 * selector选择器
 * @param selector
 * @returns
 */
export function useDataTableSelector<R extends any>(selector: (s: DataTableProcessorWipe) => R) {
  return generateSelector<R, DataTableProcessorWipe>(Context, selector);
}
