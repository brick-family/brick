import {
  BaseProcessor,
  createDefaultResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';
import {
  createApplication,
  deleteApplication,
  getApplication,
  IApplicationResponse,
  queryApplication,
  updateApplication,
  queryAppList,
} from '@brick/services';
import { IAppEntity } from '@brick/types';

export class AppProcessor extends BaseProcessor {
  queryAppListResponse: TObservableResponse<Array<IAppEntity>>;
  queryApplicationResponse: TObservableResponse<IApplicationResponse>;
  getApplicationResponse: TObservableResponse<IAppEntity>;
  createApplicationResponse: TObservableResponse<boolean>;
  deleteApplicationResponse: TObservableResponse<boolean>;
  updateApplicationResponse: TObservableResponse<IAppEntity>;

  constructor() {
    super();
    this.queryAppListResponse = createDefaultResponseQuery();
    this.queryApplicationResponse = createDefaultResponseQuery();
    this.createApplicationResponse = createDefaultResponseQuery();
    this.getApplicationResponse = createDefaultResponseQuery();
    this.deleteApplicationResponse = createDefaultResponseQuery();
    this.updateApplicationResponse = createDefaultResponseQuery();
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  get queryAppList() {
    return withProcessorServiceWrapper(queryAppList, this.queryAppListResponse);
  }

  get getApplication() {
    return withProcessorServiceWrapper(getApplication, this.getApplicationResponse);
  }
  get createApplication() {
    return withProcessorServiceWrapper(createApplication, this.createApplicationResponse);
  }
  get queryApplication() {
    return withProcessorServiceWrapper(queryApplication, this.queryApplicationResponse);
  }
  get updateApplication() {
    return withProcessorServiceWrapper(updateApplication, this.updateApplicationResponse);
  }
  get deleteApplication() {
    return withProcessorServiceWrapper(deleteApplication, this.deleteApplicationResponse);
  }

  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createAppProcessor = () => {
  let processor: null | AppProcessor = new AppProcessor();

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

export const appProcessor = createAppProcessor().processor;
