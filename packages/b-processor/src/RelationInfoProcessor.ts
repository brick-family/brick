import {
  BaseProcessor,
  createDefaultResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';
import {
  createRelationInfo,
  deleteRelationInfo,
  getRelationInfo,
  updateRelationInfo,
} from '@brick/services';
import { IRelationInfoEntity } from '@brick/types';

export class RelationInfoProcessor extends BaseProcessor {
  createRelationInfoResponse: TObservableResponse<boolean>;

  deleteRelationInfoResponse: TObservableResponse<boolean>;

  updateRelationInfoResponse: TObservableResponse<boolean>;

  getRelationInfoResponse: TObservableResponse<IRelationInfoEntity>;

  constructor() {
    super();
    this.createRelationInfoResponse = createDefaultResponseQuery();
    this.deleteRelationInfoResponse = createDefaultResponseQuery();
    this.updateRelationInfoResponse = createDefaultResponseQuery();
    this.getRelationInfoResponse = createDefaultResponseQuery();
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 创建数据
   */
  get createRelationInfo() {
    return withProcessorServiceWrapper(createRelationInfo, this.createRelationInfoResponse);
  }

  /**
   * 修改资源
   */
  get updateRelationInfo() {
    return withProcessorServiceWrapper(updateRelationInfo, this.updateRelationInfoResponse);
  }

  /**
   * 删除资源
   */
  get deleteRelationInfo() {
    return withProcessorServiceWrapper(deleteRelationInfo, this.deleteRelationInfoResponse);
  }

  /**
   * 删除资源
   */
  get getRelationInfo() {
    return withProcessorServiceWrapper(getRelationInfo, this.getRelationInfoResponse);
  }
  /**
   * 开启监听器
   */
  private listeners = () => {};
}

export const createRelationInfoProcessor = () => {
  let processor: null | RelationInfoProcessor = new RelationInfoProcessor();

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
