import {
  BaseProcessor,
  createDefaultResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';

import {
  IResourcePermListVo,
  createResourcePerm,
  deleteResourcePerm,
  getListByResourceId,
  resourcePermBind,
  resourcePermUnBind,
  updateResourcePerm,
} from '@brick/services';

export class ResourcePermProcessor extends BaseProcessor {
  resourcePermList: TObservableResponse<Array<IResourcePermListVo>>;

  deleteResourcePermResponse: TObservableResponse<boolean>;
  createResourcePermResponse: TObservableResponse<boolean>;
  updateResourcePermResponse: TObservableResponse<boolean>;
  resourcePermBindResponse: TObservableResponse<boolean>;
  resourcePermUnBindResponse: TObservableResponse<boolean>;

  constructor() {
    super();
    this.resourcePermList = createDefaultResponseQuery();
    this.deleteResourcePermResponse = createDefaultResponseQuery();
    this.createResourcePermResponse = createDefaultResponseQuery();
    this.updateResourcePermResponse = createDefaultResponseQuery();
    this.resourcePermBindResponse = createDefaultResponseQuery();
    this.resourcePermUnBindResponse = createDefaultResponseQuery();
    this.init();
  }
  private init = async () => {
    this.listeners();
  };
  /**
   * 开启监听器
   */
  private listeners = () => {};

  get getListByResourceId() {
    return withProcessorServiceWrapper(getListByResourceId, this.resourcePermList);
  }

  get deleteResourcePerm() {
    return withProcessorServiceWrapper(deleteResourcePerm, this.deleteResourcePermResponse);
  }

  get createResourcePerm() {
    return withProcessorServiceWrapper(createResourcePerm, this.createResourcePermResponse);
  }

  get updateResourcePerm() {
    return withProcessorServiceWrapper(updateResourcePerm, this.updateResourcePermResponse);
  }

  get resourcePermBind() {
    return withProcessorServiceWrapper(resourcePermBind, this.resourcePermBindResponse);
  }

  get resourcePermUnBind() {
    return withProcessorServiceWrapper(resourcePermUnBind, this.resourcePermUnBindResponse);
  }
}

export const createResourcePermProcessor = () => {
  let processor: null | ResourcePermProcessor = new ResourcePermProcessor();

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

/**
 * 导出当前Processor
 */
export const resourcePermProcessor = createResourcePermProcessor().processor;
