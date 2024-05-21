import {
  BaseProcessor,
  createDefaultResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';
import {
  createRelationData,
  deleteRelationData,
  getRelationData,
  updateRelationData,
} from '@brick/services';
import { IRelationDataEntity } from '@brick/types';

export class RelationDataProcessor extends BaseProcessor {
  createRelationDataResponse: TObservableResponse<boolean>;

  deleteRelationDataResponse: TObservableResponse<boolean>;

  updateRelationDataResponse: TObservableResponse<boolean>;

  getRelationDataResponse: TObservableResponse<IRelationDataEntity>;

  constructor() {
    super();
    this.createRelationDataResponse = createDefaultResponseQuery();
    this.deleteRelationDataResponse = createDefaultResponseQuery();
    this.updateRelationDataResponse = createDefaultResponseQuery();
    this.getRelationDataResponse = createDefaultResponseQuery();
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 创建数据
   */
  get createRelationData() {
    return withProcessorServiceWrapper(createRelationData, this.createRelationDataResponse);
  }

  /**
   * 修改资源
   */
  get updateRelationData() {
    return withProcessorServiceWrapper(updateRelationData, this.updateRelationDataResponse);
  }

  /**
   * 删除资源
   */
  get deleteRelationData() {
    return withProcessorServiceWrapper(deleteRelationData, this.deleteRelationDataResponse);
  }

  /**
   * 删除资源
   */
  get getRelationData() {
    return withProcessorServiceWrapper(getRelationData, this.getRelationDataResponse);
  }
  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createRelationDataProcessor = () => {
  let processor: null | RelationDataProcessor = new RelationDataProcessor();

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
