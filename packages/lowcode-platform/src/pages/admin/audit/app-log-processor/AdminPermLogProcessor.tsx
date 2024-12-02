import { observable, Observable } from '@legendapp/state';
import {
  withProcessorServiceWrapper,
  createDefaultResponseQuery,
  BaseProcessor,
  TObservableResponse,
} from '@brick/core';
import { queryAppLogList } from '@brick/services';
import { IAppLogEntity } from '@brick/types';

export class AdminPermLogProcessor extends BaseProcessor {
  queryAppLogResponse: TObservableResponse<IAppLogEntity>;

  constructor() {
    super();
    console.log('queryAppLogList2222', queryAppLogList);
    this.queryAppLogResponse = createDefaultResponseQuery();
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 获取应用日志列表
   * @param
   */
  get getAppLogList() {
    console.log('queryAppLogList111', queryAppLogList);
    return withProcessorServiceWrapper(queryAppLogList, this.queryAppLogResponse);
  }

  /**
   * 开启监听器
   */
  private listeners = () => {
    // 监听系统租户组的变化
  };
}

export const createAdminPermLogProcessor = () => {
  let processor: null | AdminPermLogProcessor = new AdminPermLogProcessor();

  console.log('createAdminPermLogProcessor', processor);
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

export const adminPermLogProcessor = createAdminPermLogProcessor().processor;
