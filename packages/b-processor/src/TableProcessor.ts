import {
  BaseProcessor,
  createDefaultResponseQuery,
  IResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';

import { getTable, getTableDefaultValue, queryTableAll, updateOnlyTable } from '@brick/services';
import { IDataEntity, ITableEntity } from '@brick/types';
import { Observable } from '@legendapp/state';

export class TableProcessor extends BaseProcessor {
  /**
   * 资源项
   */
  table: Observable<IResponseQuery<ITableEntity>>;

  /**
   * 资源项
   */
  tableList: TObservableResponse<Array<ITableEntity>>;

  getTableDefaultValueResponse: TObservableResponse<IDataEntity>;

  /**
   * 只修复表
   */
  updateOnlyTableResponse: TObservableResponse<boolean>;

  constructor() {
    super();
    this.table = createDefaultResponseQuery();
    this.updateOnlyTableResponse = createDefaultResponseQuery();
    this.tableList = createDefaultResponseQuery();
    this.getTableDefaultValueResponse = createDefaultResponseQuery();
    this.init();
  }
  private init = async () => {
    this.listeners();
  };
  /**
   * 开启监听器
   */
  private listeners = () => {};

  /**
   * 获取表格数据
   */
  get getTable() {
    return withProcessorServiceWrapper(getTable, this.table);
  }

  /**
   * 只修改表数据
   */
  get updateOnlyTable() {
    return withProcessorServiceWrapper(updateOnlyTable, this.updateOnlyTableResponse);
  }

  /**
   * 获取默认值
   */
  get getTableDefaultValue() {
    return withProcessorServiceWrapper(getTableDefaultValue, this.getTableDefaultValueResponse);
  }

  get queryTableAll() {
    return withProcessorServiceWrapper(queryTableAll, this.tableList);
  }
}

export const createTableProcessor = () => {
  let processor: null | TableProcessor = new TableProcessor();

  const getRoot = () => {
    return processor;
  };
  const destroy = () => {
    processor = null;
  };

  return {
    processor,
    getRoot,
    destroy,
  };
};
