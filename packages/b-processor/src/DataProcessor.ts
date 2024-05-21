import {
  BaseProcessor,
  createDefaultResponseQuery,
  generateSetObservable,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';
import { DataService, IResponse } from '@brick/services';
import { IDataEntity } from '@brick/types';
import { observable, Observable } from '@legendapp/state';

export class DataProcessor extends BaseProcessor {
  //  请求参数
  queryDataParams: Observable<DataService.IQueryDataParams>;

  // 分页数据结果
  queryDataResponse: TObservableResponse<IResponse<IDataEntity>>;

  getDataResponse: TObservableResponse<IDataEntity>;

  createDataResponse: TObservableResponse<boolean>;

  deleteDataResponse: TObservableResponse<boolean>;

  updateDataResponse: TObservableResponse<boolean>;

  batchDeleteDataResponse: TObservableResponse<boolean>;

  constructor() {
    super();

    this.queryDataParams = observable<DataService.IQueryDataParams>({
      currentPage: 1,
      pageSize: 10,
      tableId: '',
    });

    this.queryDataResponse = createDefaultResponseQuery();
    this.getDataResponse = createDefaultResponseQuery();
    this.createDataResponse = createDefaultResponseQuery();
    this.deleteDataResponse = createDefaultResponseQuery();
    this.updateDataResponse = createDefaultResponseQuery();
    this.batchDeleteDataResponse = createDefaultResponseQuery();

    this.init();
  }

  get queryData() {
    return withProcessorServiceWrapper(DataService.queryData, this.queryDataResponse);
  }

  /**
   * 设置请求参数
   */
  get setQueryDataParamsObservable() {
    return generateSetObservable(this.queryDataParams);
  }

  get getData() {
    return withProcessorServiceWrapper(DataService.getData, this.getDataResponse);
  }

  get createData() {
    return withProcessorServiceWrapper(DataService.createData, this.createDataResponse);
  }

  get deleteData() {
    return withProcessorServiceWrapper(DataService.deleteData, this.deleteDataResponse);
  }

  get updateData() {
    return withProcessorServiceWrapper(DataService.updateData, this.updateDataResponse);
  }

  get batchDeleteData() {
    return withProcessorServiceWrapper(DataService.batchDeleteData, this.batchDeleteDataResponse);
  }

  async refresh() {
    return await this.queryData(this.queryDataParams.peek());
  }

  private init = async () => {
    this.listeners();
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    this.queryDataParams.onChange(async (changeValue) => {
      if (changeValue.value.tableId === '') return;
      await this.queryData(changeValue.value);
    });
  };
}

export const createDataProcessor = () => {
  let processor: null | DataProcessor = new DataProcessor();

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
