import { createDefaultResponseQuery, IResponseQuery } from '@brick/core';

import { AppProcessor, createAppProcessor } from '@brick/processor';
import { IApplicationResponse, IQueryApplicationParams } from '@brick/services';
import { IAppEntity } from '@brick/types';
import { Observable, observable } from '@legendapp/state';

export class MainProcessor {
  // 用户信息
  appList: Observable<IResponseQuery<IApplicationResponse>>;

  // app data 请求参数
  appDataRequestParams: Observable<IQueryApplicationParams>;

  /**
   * 应用processor
   */
  appProcessor: AppProcessor;

  constructor() {
    this.appList = createDefaultResponseQuery();
    this.appDataRequestParams = observable({
      pageSize: 10,
      currentPage: 1,
    } as IQueryApplicationParams);
    this.appProcessor = createAppProcessor().processor;
    this.init();
  }

  private init = async () => {
    this.listeners();
  };

  /**
   * 请求app数据
   * @returns
   */
  requestApp = async () => {
    const params = this.appDataRequestParams.peek();
    // if (!params.tenantId) {
    //   return;
    // }
    return this.appProcessor.queryApplication(params, {
      responseObservable: this.appList,
    });
  };

  /**
   * 变更app请求参数
   * @param params
   */
  changeRequestAppParams = (params: Partial<IQueryApplicationParams>) => {
    this.appDataRequestParams.set((prev) => ({ ...prev, ...params }));
  };

  /**
   * 创建app数据
   * @param appEntity
   */
  createApp = async (appEntity: IAppEntity) => {
    this.appProcessor.createApplication(appEntity, {
      onSuccess: () => {
        this.requestApp();
      },
    });
  };

  /**
   * 修改app数据
   * @param appEntity
   */
  updateApp = async (appEntity: IAppEntity) => {
    this.appProcessor.updateApplication(appEntity, {
      onSuccess: () => {
        this.requestApp();
      },
    });
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    this.appDataRequestParams.onChange(() => {
      this.requestApp();
    });

    // 监听tenant变更
    // globalProcessor.currTenant.onChange(
    //   (data: any) => {
    //     const tId = data.value?.id;
    //     console.log('q=>tenant-change', data);
    //     this.appDataRequestParams.set((prev) => {
    //       return { ...prev, tenantId: tId };
    //     });
    //   },
    //   {
    //     initial: true, //是否立即使用当前值运行回调
    //   }
    // );
  };
}

export const createProcessor = () => {
  const mainProcessor = new MainProcessor();

  const getRoot = () => {
    return mainProcessor;
  };

  return {
    mainProcessor,
    getRoot,
  };
};
const { mainProcessor, getRoot } = createProcessor();

export { mainProcessor, getRoot };
