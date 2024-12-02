import {
  BaseProcessor,
  createDefaultResponseQuery,
  IResponseQuery,
  TObservableResponse,
  withProcessorServiceWrapper,
} from '@brick/core';
import { queryFlowModelByKey, saveFlowModel } from '@brick/services';
import { IFlowModelVo } from '@brick/types';

export class FlowModelProcessor extends BaseProcessor {
  saveModelResponse: TObservableResponse<void>;
  queryFlowModelByKeyResponse: TObservableResponse<IFlowModelVo[]>;
  constructor() {
    super();
    this.queryFlowModelByKeyResponse = createDefaultResponseQuery();
    this.saveModelResponse = createDefaultResponseQuery();
    this.init();
  }
  private init = async () => {
    this.listeners();
  };
  /**
   * 开启监听器
   */
  private listeners = () => {};

  get saveModel() {
    return withProcessorServiceWrapper(saveFlowModel, this.saveModelResponse);
  }

  get queryFlowModelByKey() {
    return withProcessorServiceWrapper(queryFlowModelByKey, this.queryFlowModelByKeyResponse);
  }
}

export const createFlowModelProcessor = () => {
  let processor: null | FlowModelProcessor = new FlowModelProcessor();

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
